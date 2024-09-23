using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OnlineStore.Azul;
using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;

namespace OnlineStore.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAzulService _azulService;
        private readonly UserManager<User> _userManager;
        private readonly AppSettings _appSettings;

        public InvoiceService(AppSettings appSettings, ApplicationDbContext context, IAzulService azulService, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
            _azulService = azulService;
            _appSettings = appSettings;
        }

        public async Task<Result<object>> AddInvoice(BuyProductVm vm)
        {
            var user = await ValidateUser(vm);
            Subscription? subscription = null;
            var product =await _context.Products.FindAsync(vm.ProductId);
            var order = await _azulService.ProcessPayment(new()
            {
                Amount = product.Price * vm.Quantity,
                CardNumber = vm.CardNumber,
                CVC = vm.Cvv,
                Itbis = 0,
                Expiration = Convert.ToInt32(vm.CardExpiration),
                DataVaultToken = user.AzulVaultTokenId??"",
            });
            if (order?.Status < 0)
                return new Result<object> { Status = -1, Message = order.Message};

            if (product.IsSubscriptionBased) 
            {
                var currentSubscription = await _context.Subscriptions.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == user.Id && x.ProductId == vm.ProductId);
                if (currentSubscription is null)
                {
                    var addResult = _context.Subscriptions.Add(new Subscription()
                    {
                        Active = true,
                        AzulSubscriptionId = order.Data?.AzulOrderId.ToString(),
                        LastPaymentSuccess = true,
                        LastSuccessfulPayment = DateTime.Now,
                        UserId = user.Id,
                        ProductId = product.Id,
                        StartDate = DateTime.Now,
                        Payments = [new SubscriptionPayment()
                        {
                            Amount = vm.Quantity * product.Price,
                            Date = DateTime.Now,
                            ProcessResponse = JsonConvert.SerializeObject(order)
                        }]

                    });
                    await _context.SaveChangesAsync();
                    subscription = addResult.Entity;
                }
                else
                    subscription = currentSubscription;
            }

            await _context.Invoices.AddAsync(new() 
            {
                Amount = product.Price,
                AzulResponse = Algorithm.Encrypt( JsonConvert.SerializeObject(order), _appSettings.TokenKey),
                Quantity = vm.Quantity,
                TotalAmount = product.Price * vm.Quantity,
                Taxes = 0,
                Date = DateTime.Now,
                IsSubscription = product.IsSubscriptionBased,
                ProductId = vm.ProductId,
                SubscriptionId = subscription is not null? subscription.Id : null,
                UserId=user.Id,
            });
            await _context.SaveChangesAsync();
            if (string.IsNullOrEmpty(user.AzulVaultTokenId))
            {
                user.AzulCardType = order!.Data!.DataVaultBrand;
                user.AzulExpirationDate = order.Data.DataVaultExpiration;
                user.AzulMaskedCardNumber = order.Data.CardNumber;
                user.AzulVaultTokenId = order.Data.DataVaultToken;
                user.AzulVaultExpiration = order.Data.DataVaultExpiration;
                await _userManager.UpdateAsync(user);
            }

            return new Result<object>() { Status = 0, Message = "ok", Data  = order };
        }

        private decimal ConvertToUsd(decimal amount) => amount;
        private async  Task<User> ValidateUser(BuyProductVm vm) 
        {
            var existingUser = await _userManager.FindByEmailAsync(vm.Email);
            if(existingUser is not null)
                return existingUser;

            var userCreated = await _userManager.CreateAsync(new()
            {
                Email = vm.Email,
                DocumentId = Algorithm.Encrypt(JsonConvert.SerializeObject(vm.DocumentId), _appSettings.TokenKey),
                DocumentIdType = "Cedula",
                FirstName = vm.Name,
                LastName = vm.LastName,
                PhoneNumber = vm.PhoneNumber,
                UserName = vm.Email
            });

            if ((userCreated?.Succeeded).GetValueOrDefault()) 
            {
                var user = (await _userManager.FindByEmailAsync(vm.Email))!;
                await _userManager.AddPasswordAsync(user, vm.Password ?? "askdsdkf*&^@");
                return user;
            }
            else
                throw new Exception($"Error al validar al usuario");
        }
    }
}

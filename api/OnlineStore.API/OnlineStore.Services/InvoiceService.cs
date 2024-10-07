using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OnlineStore.Azul;
using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;
using OnlineStore.Services.Email;
using System.Linq;

namespace OnlineStore.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly ApplicationDbContext _context;
        private readonly IAzulService _azulService;
        private readonly UserManager<User> _userManager;
        private readonly AppSettings _appSettings;
        private readonly EmailTemplates _emailTemplates;

        public InvoiceService(
            AppSettings appSettings,
            ApplicationDbContext context,
            IAzulService azulService,
            UserManager<User> userManager,
            EmailTemplates emailTemplates)
        {
            _emailTemplates = emailTemplates;
            _context = context;
            _userManager = userManager;
            _azulService = azulService;
            _appSettings = appSettings;
        }

        public async Task<Result<object>> AddInvoiceAsync(BuyProductVm vm)
        {
            var user = await ValidateUser(vm);
            Subscription? subscription = null;
            var order = await _azulService.ProcessPayment(new()
            {
                Amount = vm.Items.Sum(x => x.Total),
                CardNumber = vm.CardNumber,
                CVC = vm.Cvv,
                Itbis = 0,
                Expiration = Convert.ToInt32(vm.Expiration.Replace("/", "")),
                DataVaultToken = user.AzulVaultTokenId ?? "",
            });
            if (order?.Status < 0)
                return new Result<object> { Status = -1, Message = order.Message };

            vm.Items.ToList().ForEach(item =>
            {
                var product = _context.Products.AsNoTracking().FirstOrDefault(x => x.Id == item.ProductId);
                if (product is null)
                    throw new Exception("Invalid product/service");

                if (product.IsSubscriptionBased)
                {
                    var currentSubscription = _context.Subscriptions.AsNoTracking().FirstOrDefault(x => x.UserId == user.Id && x.ProductId == product.Id);
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
                                Amount = item.Total,
                                Date = DateTime.Now,
                                ProcessResponse = JsonConvert.SerializeObject(order)
                            }]

                        });
                        _context.SaveChanges();
                        subscription = addResult.Entity;
                    }
                    else
                        subscription = currentSubscription;
                }

                var invoice = _context.Invoices.Add(new()
                {
                    Amount = product.Price,
                    AzulResponse = Algorithm.Encrypt(JsonConvert.SerializeObject(order), _appSettings.TokenKey),
                    Quantity = item.Quantity,
                    TotalAmount = product.Price * item.Quantity,
                    Taxes = 0,
                    Date = DateTime.Now,
                    IsSubscription = product.IsSubscriptionBased,
                    ProductId = product.Id,
                    SubscriptionId = subscription is not null ? subscription.Id : null,
                    UserId = user.Id,
                    OrderId = order.Data.AzulOrderId.ToString()
                });
                _context.SaveChanges();
            });

            if (string.IsNullOrEmpty(user.AzulVaultTokenId) is false)
            {
                user.AzulCardType = order!.Data!.DataVaultBrand;
                user.AzulExpirationDate = order.Data.DataVaultExpiration;
                user.AzulMaskedCardNumber = order.Data.CardNumber;
                user.AzulVaultTokenId = order.Data.DataVaultToken;
                user.AzulVaultExpiration = order.Data.DataVaultExpiration;
                await _userManager.UpdateAsync(user);
            }

            // await _emailTemplates.SendInvoiceAsync(invoice.Entity);
            return new Result<object>() { Status = 0, Message = "ok", Data = order };
        }

        public async Task<Result<IEnumerable<Invoice>>> GetUserInvoicesAsync(string userId, DateTime from, DateTime? to)
        {
            var toDate = to.HasValue?to.Value: DateTime.Now;
            var invoices = await _context.Invoices.Include(i => i.Product).AsNoTracking().Where(i => i.UserId == userId && i.Date >= from && i.Date <= toDate).ToListAsync();
            return new Result<IEnumerable<Invoice>>
            {
                Status = 0,
                Data = invoices.Select(x => new Invoice
                {
                    Amount = x.Amount,
                    OrderId = x.OrderId,
                    Quantity = x.Quantity,
                    Taxes = x.Taxes,
                    TotalAmount = x.TotalAmount,
                    Date = x.Date,
                    Id = x.Id,
                    Product = new Product { Id = x.Product.Id, Name = x.Product.Name, PictureUrl = x.Product.PictureUrl, Description = x.Product.Description, Price = x.Product.Price },
                })
            };
        }

        private decimal ConvertToUsd(decimal amount) => amount;
        private async Task<User> ValidateUser(BuyProductVm vm)
        {
            var existingUser = await _userManager.FindByEmailAsync(vm.Email);
            if (existingUser is not null)
                return existingUser;

            // var userCreated = await _userManager.CreateAsync(new()
            // {
            //     Email = vm.Email,
            //     DocumentId = Algorithm.Encrypt(JsonConvert.SerializeObject(vm.DocumentId), _appSettings.TokenKey),
            //     DocumentIdType = "Cedula",
            //     FirstName = vm.Name,
            //     LastName = vm.LastName,
            //     PhoneNumber = vm.PhoneNumber,
            //     UserName = vm.Email
            // });

            // if ((userCreated?.Succeeded).GetValueOrDefault()) 
            // {
            //     var user = (await _userManager.FindByEmailAsync(vm.Email))!;
            //     await _userManager.AddPasswordAsync(user, vm.Password ?? "askdsdkf*&^@");
            //     return user;
            // }
            // else
            throw new Exception($"Invalid user");
        }
    }
}

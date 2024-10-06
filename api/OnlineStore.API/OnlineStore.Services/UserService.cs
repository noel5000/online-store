using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using OnlineStore.Azul;
using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;
using OnlineStore.Services.Email;

namespace OnlineStore.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly AppSettings _appSettings;

        private readonly TokenServices _tokenService;

        public UserService(
            AppSettings appSettings,
            ApplicationDbContext context,
            UserManager<User> userManager,
            TokenServices tokenServices)
        {
            _tokenService = tokenServices;
            _context = context;
            _userManager = userManager;
            _appSettings = appSettings;
        }

        public async Task<Result<User>> GetUserAsync(string id)
        {
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x=> x.Id == id);
            if(user is null)
                return new Result<User>{Status = -1, Message = "User not found"};
            return new Result<User>{Data = user, Message= "Ok"};
        }

        public async Task<Result<TokenVm>> LoginAsync(LoginVM vm)
        {
            var user = await _userManager.FindByEmailAsync(vm.Email);
            if(user is null)
                return new Result<TokenVm>{Status = -1, Message = "User not found"};

            var isValidPassword = await _userManager.CheckPasswordAsync(user, vm.Password);
            if(!isValidPassword)
                return new Result<TokenVm>{Status =-1, Message= "Invalid credentials"};
            
            var token = _tokenService.Generate(user);

            if (token is null)
                return new Result<TokenVm>{Status = -1, Message = "Login error"};
            
            return new Result<TokenVm>{Data = token};
            

        }

        public async Task<Result<TokenVm>> RegisterUserAsync(RegisterUserVM vm)
        {
            var createResult = await _userManager.CreateAsync(new User
            {
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                Address = vm.Address,
                Address2 = vm.Address2,
                Country = vm.Country,
                State = vm.State,
                ZipCode = vm.ZipCode,
                Email = vm.Email,
                ShippingIsBilling = vm.ShippingIsBilling,
                UserName = vm.Email
            });

            if(createResult.Succeeded is false)
                return new Result<TokenVm>{Status =-1, Message =createResult.ToString()};
            
            var user = await _userManager.FindByEmailAsync(vm.Email);
            var passwordResult = await _userManager.AddPasswordAsync(user!, vm.Password);
            if(!passwordResult.Succeeded)
                return new Result<TokenVm>{Status = -1, Message = passwordResult.ToString()};
            
             var token = _tokenService.Generate(user!, ["user"]);

            if (token is null)
                return new Result<TokenVm>{Status = -1, Message = "Login error"};
            
            return new Result<TokenVm>{Data = token};
        }

        public async Task<Result<User>> UpdateUserAsync(User user)
        {
           var updateResult = await _userManager.UpdateAsync(user);
           if(!updateResult.Succeeded)
           return new Result<User>{Status = -1, Message =updateResult.ToString()};

           return new Result<User>{Message = "OK"};
        }
    }
}

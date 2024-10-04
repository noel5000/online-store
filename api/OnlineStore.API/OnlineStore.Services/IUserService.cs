using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Services
{
    public interface IUserService
    {
        Task<Result<TokenVm>> RegisterUser(RegisterUserVM vm);
        Task<Result<TokenVm>> Login(LoginVM vm);
        Task<Result<User>> GetUser(string id);
        Task<Result<User>> UpdateUser(User user);
    }
}

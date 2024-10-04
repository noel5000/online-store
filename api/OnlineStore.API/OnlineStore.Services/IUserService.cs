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
        Task<Result<TokenVm>> RegisterUserAsync(RegisterUserVM vm);
        Task<Result<TokenVm>> LoginAsync(LoginVM vm);
        Task<Result<User>> GetUserAsync(string id);
        Task<Result<User>> UpdateUserAsync(User user);
    }
}

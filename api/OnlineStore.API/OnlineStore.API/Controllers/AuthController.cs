using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;
using OnlineStore.Services;
using OnlineStore.Services.Security;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
           _userService = userService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginVM vm)
        {
            try
            {
                return Ok(await _userService.LoginAsync(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUserAsync([FromBody] RegisterUserVM vm)
        {
            try
            {
                return Ok(await _userService.RegisterUserAsync(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpPut("UpdateUser")]
        [CustomAuthorize(["user"])]
        public async Task<IActionResult> UpdateUserAsync([FromBody] User vm)
        {
            try
            {
                vm.Id = Request.GetUserId();
                return Ok(await _userService.UpdateUserAsync(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }


        [HttpGet("GetUserInfo")]
        [CustomAuthorize(["user"])]
        public async Task<IActionResult> GetUserInfoAsync()
        {
            try
            {
                return Ok(await _userService.GetUserAsync(Request.GetUserId()));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

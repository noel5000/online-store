using Microsoft.AspNetCore.Mvc;
using OnlineStore.Data;
using OnlineStore.Database;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerMessageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomerMessageController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CustomerSupportMessageVm vm)
        {
            try
            {
                vm.UserId = HttpContext.Request.GetUserId();
                await _context.CustomerSupportMessages.AddAsync(new CustomerSupportMessage()
                {
                    ClientEmail = vm.ClientEmail,
                    ClientName = vm.ClientName,
                    Date = DateTime.Now,
                    Message = vm.Message,
                    Subject = vm.Subject,
                    UserId = string.IsNullOrEmpty(vm.UserId) ? null : vm.UserId,
                });
                await _context.SaveChangesAsync();
                // validar que el mail del usuario en sesion sea el mismo que el del cuerpo
                return Ok(new {status = 0, message = "OK"});
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

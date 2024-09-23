using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Common;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;
using OnlineStore.Services;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(ILogger<WeatherForecastController> logger, ApplicationDbContext dbContext)
        {
            _context = dbContext;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BuyProductVm vm)
        {
            try
            {
                return Ok(await _invoiceService.AddInvoice(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

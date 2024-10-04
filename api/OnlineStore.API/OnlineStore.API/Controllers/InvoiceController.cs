using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Common;
using OnlineStore.Data.ViewModels;
using OnlineStore.Database;
using OnlineStore.Services;
using OnlineStore.Services.Security;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost]
       [CustomAuthorize(["user"])]
        public async Task<IActionResult> Post([FromBody] BuyProductVm vm)
        {
            try
            {
                // validar que el mail del usuario en sesion sea el mismo que el del cuerpo
                return Ok(await _invoiceService.AddInvoice(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

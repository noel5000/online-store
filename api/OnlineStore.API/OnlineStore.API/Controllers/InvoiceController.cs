using Microsoft.AspNetCore.Mvc;
using OnlineStore.Common;
using OnlineStore.Data;
using OnlineStore.Data.ViewModels;
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
                return Ok(await _invoiceService.AddInvoiceAsync(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpPost("AddSupportMessage")]
        [CustomAuthorize(["user"])]
        public async Task<IActionResult> AddSupportMessageAsync([FromBody] InvoiceSupportMessageVm vm)
        {
            try
            {
                vm.UserId = HttpContext.Request.GetUserId();
                // validar que el mail del usuario en sesion sea el mismo que el del cuerpo
                return Ok(await _invoiceService.AddSupportMessageAsync(vm));
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }

        [HttpGet("GetUserHistory/{option:int}")]
        [CustomAuthorize(["user"])]
        public async Task<IActionResult> GetUserHistoryAsync(OrderHistoryOptions option = 0)
        {
            try
            {
                var userId = Request.GetUserId();
                if (string.IsNullOrEmpty(userId))
                    return Ok(new { status = -1, message = "Invalid user" });

                var fromDate = new DateTime();
                switch(option) 
                {
                    case OrderHistoryOptions.Months_3:
                        fromDate = DateTime.Now.AddMonths(-3);
                        break;
                    case OrderHistoryOptions.Months_6:
                        fromDate = DateTime.Now.AddMonths(-6);
                        break;
                    case OrderHistoryOptions.LastYear:
                        fromDate = DateTime.Now.AddYears(-1);
                        break;
                }

                var invoices = await _invoiceService.GetUserInvoicesAsync(userId, new DateTime(fromDate.Year, fromDate.Month, fromDate.Day), option == OrderHistoryOptions.PreviousYear ?
                    new DateTime(DateTime.Now.Year-1, 12, 31) : null);
                return Ok (invoices);
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }



        [HttpGet("GetInvoiceDetails/{orderId}")]
        [CustomAuthorize(["user"])]
        public async Task<IActionResult> GetInvoiceDetailsAsync(string orderId)
        {
            try
            {
                var data = await _invoiceService.GetOrderDetailsAsync(orderId);
                if (data is null)
                    throw new Exception("Order Id is not valid");
                return Ok( data!);
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

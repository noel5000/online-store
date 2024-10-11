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
    public interface IInvoiceService
    {
        Task<Result<object>> AddInvoiceAsync(BuyProductVm vm);

        Task<Result<InvoiceSupportMessage>> AddSupportMessageAsync(InvoiceSupportMessageVm vm);

        Task<Result<IEnumerable<Invoice>>> GetUserInvoicesAsync(string userId, DateTime from, DateTime? to);

        Task<Result<object>> GetOrderDetailsAsync(string userId);
    }
}

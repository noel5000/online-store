using OnlineStore.Common;
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
        Task<Result<object>> AddInvoice(BuyProductVm vm);
    }
}

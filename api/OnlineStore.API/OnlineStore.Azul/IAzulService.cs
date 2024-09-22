using OnlineStore.Azul.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul
{
    public interface IAzulService
    {
        Task<PaymentResult> ProcessPayment(Payment payment);
        Task<PaymentResult> ProcessRefund(Payment payment);
        Task<PaymentResult> AddVault(Payment payment);

        Task<PaymentResult> RemoveVault(Payment payment);
    }
}

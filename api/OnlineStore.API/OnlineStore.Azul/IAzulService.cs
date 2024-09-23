using OnlineStore.Azul.Models;
using OnlineStore.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul
{
    public interface IAzulService
    {
        Task<Result<PaymentResult>> ProcessPayment(Payment payment);
        Task<Result<PaymentResult>> ProcessRefund(Refund payment);
        Task<Result<AddVaultResult>> AddVault(AddVault payment);

        Task<Result<PaymentResult>> RemoveVault(Payment payment);
        Task<Result<SubscriptionResponse>> AddSubscription(AddSubscription payment);
    }
}

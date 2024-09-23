

using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineStore.Data
{
    public class SubscriptionPayment
    {
        public int Id { get; set; }

        public int SubscriptionId { get; set; }
        public DateTime Date { get; set; }
        public string? ProcessResponse { get; set; }
        public decimal Amount { get; set; }

        [ForeignKey("SubscriptionId")]
        public virtual Subscription Subscription { get; set; }


    }
}

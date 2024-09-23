

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineStore.Data
{
    public class Subscription
    {

        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }
        public string UserId { get; set; }
        public DateTime? Expiration { get; set; }
        public DateTime StartDate { get; set; }
        public string? AzulSubscriptionId { get; set; }
        public DateTime? LastSuccessfulPayment { get; set; }
        public DateTime? LastFailedPayment { get; set; }
        public bool LastPaymentSuccess { get; set; }
        public bool Active { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual IEnumerable<SubscriptionPayment> Payments { get; set; } = [];
    }
}

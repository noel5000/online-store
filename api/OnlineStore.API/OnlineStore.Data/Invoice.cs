

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineStore.Data
{
    public class Invoice
    {

        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ProductId { get; set; }
        public decimal Amount { get; set; }
        public decimal Taxes { get; set; }
        public decimal TotalAmount { get; set; }
        public bool IsSubscription { get; set; }
        public DateTime Date {  get; set; }
        public decimal Quantity { get; set; } = 1;

        public int? SubscriptionId { get; set; }
        public string? AzulResponse { get; set; }

        public string OrderId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        [ForeignKey("SubscriptionId")]
        public virtual Subscription? Subscription { get; set; }
    }
}

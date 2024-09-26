

using System.ComponentModel.DataAnnotations;

namespace OnlineStore.Data
{
    public class Product
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; } = null;
        public string? PictureUrl { get; set; } = null;
        public decimal Price { get; set; }
        public bool IsSubscriptionBased { get; set; }
        public int Quantity { get; set; } = 0;

        public virtual ICollection<Subscription> Subscriptions { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}

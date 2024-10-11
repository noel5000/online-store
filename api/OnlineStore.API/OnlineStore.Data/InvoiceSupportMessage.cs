

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineStore.Data
{
    public class InvoiceSupportMessage
    {

        [Key]
        public int Id { get; set; }

        public string OrderId { get; set; }
        public int InvoiceId { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public string? Status { get; set; } = "Received";
        public string? ClientName { get; set; }
        public string? ClientEmail { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }

        [ForeignKey("InvoiceId")]
        public virtual Invoice Invoice { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

    }

    public class InvoiceSupportMessageVm
    {
        [Required]
        public string OrderId { get; set; }
        public string? UserId { get; set; }
        [Required]
        public string? ClientName { get; set; }
        [Required]
        public string? ClientEmail { get; set; }
        [Required]
        public string? Subject { get; set; }
        [Required]
        public string? Message { get; set; }
    }
}

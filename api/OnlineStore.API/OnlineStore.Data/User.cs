
using Microsoft.AspNetCore.Identity;

namespace OnlineStore.Data
{
    public class User : IdentityUser
    {
        public string? AzulVaultTokenId { get; set; }
        public string? DocumentIdType { get; set; }
        public string? DocumentId { get; set; }
        public string? AzulMaskedCardNumber { get; set; }
        public string? AzulMaskedCvv { get; set; }
        public string? AzulExpirationDate { get; set; }
        public string? AzulCardType { get; set; }
        public string? AzulVaultExpiration { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        public virtual ICollection<Subscription> Subscriptions { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}

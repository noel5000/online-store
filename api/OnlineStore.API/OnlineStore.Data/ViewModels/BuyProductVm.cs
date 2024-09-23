using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Data.ViewModels
{
    public class BuyProductVm
    {
        [Required]
        public string Email { get; set; }

        public string? UserId { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? DocumentId { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string Cvv { get; set; }
        [Required]
        public string CardExpiration { get; set; }
        [Required]
    
        public int ProductId { get; set; }
        public decimal Quantity { get; set; } = 1;
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}

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
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Address { get; set; }
        public string? Address2 { get; set; }


        [Required]
        public string Country { get; set; }
        [Required]
        public string? State { get; set; }

        [Required]
        public string ZipCode {get; set;}

        public bool shippingIsBilling {get;set;}


        public string? UserId { get; set; }
        public string? PhoneNumber { get; set; }
        [Required]
        public string NameOnCard { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string Cvv { get; set; }
        [Required]
        public string Expiration { get; set; }
        


        public IEnumerable<CartItem> Items {get;set;} = [];
    }

    public class CartItem {
        [Required]
        public int ProductId {get;set;}
        public decimal Quantity {get;set;}
        public decimal Total {get;set;}
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Data.ViewModels
{
    public class RegisterUserVM
    {

        [Required]
        public string Email {get;set;}

        [Required]
        public string Password {get;set;}

        [Required]
        public string FirstName {get;set;}

        [Required]
        public string LastName {get;set;}

        [Required]
        public string Country {get;set;}

        [Required]
        public string State {get;set;}

        [Required]
        public string Address {get;set;}
        public string Address2 {get;set;}

        [Required]
        public string ZipCode {get;set;}
        public bool ShippingIsBilling {get;set;}
    }
}

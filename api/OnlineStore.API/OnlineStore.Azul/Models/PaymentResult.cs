using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class PaymentResult
    {
        public string AuthorizationCode { get; set; }
        public string CustomOrderId { get; set; }
        public int DateTime { get; set; }
        public string ErrorDescription { get; set; }
        public int ISOCode { get; set; }
        public int LotNumber { get; set; }
        public int RRN { get; set; }
        public int AzulOrderId { get; set; }
        public string ResponseCode { get; set; }
        public string ReponseMessage { get; set; }
        public int Ticket { get; set; }
        public string CardNumber { get; set; }

    }
}

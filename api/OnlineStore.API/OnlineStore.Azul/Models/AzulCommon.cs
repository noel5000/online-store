using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class AzulCommon
    {
        public string Channel { get; set; }
        public string Store { get; set; }
        public string CardNumber { get; set; }
        public int Expiration { get; set; }
        public string CVC { get; set; }
        public string PosInputMode { get; set; }
        public string TrxType { get; set; }
        public decimal Amount { get; set; }
        public decimal Itbis { get; set; }
        public string OrderNumber { get; set; }
        public string CustomOrderId { get; set; } = DateTime.Now.Ticks.ToString();
        public string CustomerServicePhone { get; set; }
        public string ECommerceURL { get; set; }
        public int AcquirerRefData { get; set; } = 1;

    }
}

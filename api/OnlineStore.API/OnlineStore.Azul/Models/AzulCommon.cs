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
        public int CardNumber { get; set; }
        public int Expiration { get; set; }
        public int CVC { get; set; }
        public string PosInputMode { get; set; }
        public string TrxType { get; set; }
        public decimal Amount { get; set; }
        public decimal Itbis { get; set; }
        public string OrderNumber { get; set; }
        public string CustomOrderId { get; set; } = DateTime.Now.Ticks.ToString();

    }
}

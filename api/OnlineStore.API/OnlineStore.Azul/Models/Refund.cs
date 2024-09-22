using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class Refund : AzulCommon
    {
        public Refund() 
        {
            TrxType = TransactionTypes.Refund.ToString();
        }
        public int OriginalDate { get; set; }
        public int OriginalTrxTicketNr { get; set; }
        public string ECommerceURL { get; set; }
        public string AzulOrderId { get; set; }
        public string ResponseCode { get; set; }
        public int RRN { get; set; } = 1;
        public string CustomerServicePhone { get; set; }
        public string OrderNumber { get; set; }
        public string AcquirerRefData { get; set; }

    }
}

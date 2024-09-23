using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class Payment: AzulCommon
    {
        public Payment() 
        {
            TrxType = TransactionTypes.Sale.ToString();
        }
        public string CustomerServicePhone { get; set; }
        public string ECommerceURL { get; set; }
        public string AltMerchantName { get; set; }
        public string DataVaultToken { get; set; }
        public int SaveToDataVault { get; set; } = 1;
        public int ForceNo3DS { get; set; } = 0;

    }
}

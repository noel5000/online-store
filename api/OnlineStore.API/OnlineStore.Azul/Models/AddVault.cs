using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class AddVault
    {
        public string Channel { get; set; }
        public string Store { get; set; }
        public string CardNumber { get; set; }
        public int Expiration { get; set; }
        public string CVC { get; set; }
        public string TrxType { get; set; } = TransactionTypes.CREATE.ToString();

    }

    public class AddVaultResult
    {
        public string CardNumber { get; set; }
        public string DataVaultToken { get; set; }
        public string Brand { get; set; }
        public string Expiration { get;set; }
        public bool HasCVV { get; set; }


        public string ErrorDescription { get; set; }
        public int ISOCode { get; set; }
        public string ReponseMessage { get; set; }

    }
}

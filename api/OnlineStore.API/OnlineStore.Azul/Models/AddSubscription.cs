using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Azul.Models
{
    public class AddSubscription : AzulCommon
    {
        public AddSubscription()
        {
            TrxType = TransactionTypes.Sale.ToString();
        }
        public string CustomerName { get; set; }
        public string CustomerContract { get; set; }
        public string CustomerIdentNum { get; set; } 
        public string CustomerEmail { get; set; }
        public bool CustomerEmailNotificationsTrx { get; set; } = true;
        public bool CustomerEmailNotificationsExpired { get; set; } = true;
        public bool CustomerEmailNotificationsNearExpired { get; set; } = true;
        public string StartDate { get; set; } = DateTime.Now.ToString("yyyy-MM-dd");
        public string? MaxRepeats { get; set; }
        public string Frequency { get; set; } = "MonthlyByDay";
        public string FrequencyParamEveryXMonths { get; set; } = "1";
        public string FrequencyParamDay { get; set; } = DateTime.Now.ToString("dd");
        public string FrequencyParamMonth { get; set; } = DateTime.Now.ToString("M");
        public string CustomerIdentType { get; set; } = "Cedula";
        public string DataVaultToken { get; set; }
        public int SaveToDataVault { get; set; } = 1;
        public int ForceNo3DS { get; set; } = 0;
    }


    public class SubscriptionResponse
    {
        public string CustomSubscriptionId { get; set; }
        public string ErrorDescription { get; set; }
        public string NextScheduledDate { get; set; }
        public string ResponseCode { get; set; }
    }

}

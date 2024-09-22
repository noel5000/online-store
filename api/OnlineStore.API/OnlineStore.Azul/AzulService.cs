using OnlineStore.Azul.Models;
using OnlineStore.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace OnlineStore.Azul
{
    public class AzulService : IAzulService
    {
        private readonly AppSettings _appSettings;
        private readonly ClientRestFul _clientRestFul;
        public AzulService(AppSettings settings) 
        {
            _appSettings = settings;
            _clientRestFul = new ClientRestFul(_appSettings.AzulServiceUrl, HttpVerb.POST, Authorization.NONE);
            _clientRestFul.Headers = new Dictionary<string, string>() 
            {
                { "Auht1", Algorithm.Decrypt(_appSettings.AzulFactor1, _appSettings.TokenKey) },
                { "Auht2", Algorithm.Decrypt(_appSettings.AzulFactor2, _appSettings.TokenKey) }
            };
        }
        public async Task<PaymentResult> ProcessPayment(Payment payment) 
        {
            try
            {
                _clientRestFul.PostData = JsonConvert.SerializeObject(payment);
                var result = JsonConvert.DeserializeObject<PaymentResult>( await _clientRestFul.MakeRequestAsync());
                return result;
            }
            catch(Exception ex) 
            {
                throw ex;
            }
        }
    }
}

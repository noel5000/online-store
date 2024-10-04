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
    public class AzulTestService : IAzulService
    {
        private readonly AppSettings _appSettings;
        private readonly ClientRestFul _clientRestFul;
        private readonly string _channel;
        private readonly string _store;
        private readonly string _posInputMode;
        public AzulTestService(AppSettings settings)
        {
            _appSettings = settings;
            _clientRestFul = new ClientRestFul(_appSettings.AzulServiceUrl, HttpVerb.POST, Authorization.NONE);
            _clientRestFul.Headers = new Dictionary<string, string>()
            {
                { "Auht1", Algorithm.Decrypt(_appSettings.AzulFactor1, _appSettings.TokenKey) },
                { "Auht2", Algorithm.Decrypt(_appSettings.AzulFactor2, _appSettings.TokenKey) }
            };
        }

        public async Task<Result<SubscriptionResponse>> AddSubscription(AddSubscription payment)
        {
            try
            {
                return await Task.Factory.StartNew<Result<SubscriptionResponse>>((arg)=>{
                    return new Result<SubscriptionResponse>{Data = new SubscriptionResponse{
                        CustomSubscriptionId = DateTime.Now.Ticks.ToString(),
                        ResponseCode= "200"
                    }};
                }, null);
            }
            catch (Exception ex)
            {
                return new Result<SubscriptionResponse>() { Message = ex.Message, Status = -1 };
            }
        }

        public async Task<Result<AddVaultResult>> AddVault(AddVault payment)
        {
            try
            {
                payment.Channel = _channel;
                payment.Store = _store;
                _clientRestFul.PostData = JsonConvert.SerializeObject(payment);
                var result = JsonConvert.DeserializeObject<AddVaultResult>(await _clientRestFul.MakeRequestAsync("?ProcessDataVault"));
                if (string.IsNullOrEmpty(result.DataVaultToken))
                    return new Result<AddVaultResult> { Status = -1, Message = result.ErrorDescription };
                else
                    return new Result<AddVaultResult> { Message = result.ReponseMessage, Data = result };
            }
            catch (Exception ex)
            {
                return new Result<AddVaultResult>() { Message = ex.Message, Status = -1 };
            }
        }

        public async Task<Result<PaymentResult>> ProcessPayment(Payment payment)
        {
            try
            {
                  return await Task.Factory.StartNew<Result<PaymentResult>>((arg)=>{
                    return new Result<PaymentResult>{Data = new PaymentResult{
                        AuthorizationCode = DateTime.Now.Ticks.ToString(),
                        ResponseCode= "200",
                        DataVaultToken = "TEST_TOKEN",
                        AzulOrderId = new Random().Next(1,20000)
                    }};
                }, null);
            }
            catch (Exception ex)
            {
                return new Result<PaymentResult>() { Message = ex.Message, Status = -1 };
            }
        }

        public async Task<Result<PaymentResult>> ProcessRefund(Refund payment)
        {
            try
            {
                payment.TrxType = TransactionTypes.Refund.ToString();
                payment.CardNumber = "";
                payment.CVC = "";
                SetStoreParameters(payment);
                _clientRestFul.PostData = JsonConvert.SerializeObject(payment);
                var result = JsonConvert.DeserializeObject<PaymentResult>(await _clientRestFul.MakeRequestAsync());
                return SetResultStatus(result);
            }
            catch (Exception ex)
            {
                return new Result<PaymentResult>() { Message = ex.Message, Status = -1 };
            }
        }

        public Task<Result<PaymentResult>> RemoveVault(Payment payment)
        {
            throw new NotImplementedException();
        }

        private Result<PaymentResult> SetResultStatus(PaymentResult? result)
        {
            if (result is null || result.ReponseMessage?.ToLower() != "aprobada" ||
                string.IsNullOrEmpty(result.AuthorizationCode) || result.AzulOrderId <= 0)
                return new Result<PaymentResult>() { Status = -1, Message = result.ReponseMessage, Data = result };
            else
                return new Result<PaymentResult>() { Status = 0, Data = result, Message = result.ReponseMessage };
        }

        private void SetStoreParameters(AzulCommon payment)
        {
            payment.Channel = _channel;
            payment.Store = _store;
            payment.PosInputMode = _posInputMode;
            //payment.OrderNumber = DateTime.UtcNow.Ticks.ToString();
            payment.CustomOrderId = DateTime.UtcNow.Ticks.ToString();
            payment.CustomerServicePhone = _appSettings.CustomerServicePhone;
            payment.ECommerceURL = _appSettings.ECommerceURL;

        }
    }
}

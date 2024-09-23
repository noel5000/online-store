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
        private readonly string _channel;
        private readonly string _store;
        private readonly string _posInputMode;
        public AzulService(AppSettings settings)
        {
            _appSettings = settings;
            _clientRestFul = new ClientRestFul(_appSettings.AzulServiceUrl, HttpVerb.POST, Authorization.NONE);
            _channel = Algorithm.Decrypt(_appSettings.AzulChannel, _appSettings.TokenKey);
            _store = Algorithm.Decrypt(_appSettings.AzulStore, _appSettings.TokenKey);
            _posInputMode = Algorithm.Decrypt(_appSettings.AzulPosInputMode, _appSettings.TokenKey);
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
                payment.TrxType = TransactionTypes.Sale.ToString();
                payment.CardNumber = !string.IsNullOrEmpty(payment.DataVaultToken) ? "" : payment.CardNumber;
                payment.CVC = !string.IsNullOrEmpty(payment.DataVaultToken) ? "" : payment.CVC;
                SetStoreParameters(payment);
                _clientRestFul.PostData = JsonConvert.SerializeObject(payment);
                var result = JsonConvert.DeserializeObject<SubscriptionResponse>(await _clientRestFul.MakeRequestAsync("?recurringsubscriptioncreate"));
                return result.ResponseCode.ToLower() == "created" ? new Result<SubscriptionResponse> { Data = result, Status = 0 } :
                    new Result<SubscriptionResponse> { Status = -1, Message = result.ErrorDescription, Data = result };
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
                payment.AltMerchantName = _appSettings.MerchantName?.Length > 25 ?
                    _appSettings.MerchantName.Substring(0, 25) : _appSettings.MerchantName ?? "";
                payment.TrxType = TransactionTypes.Sale.ToString();
                payment.CardNumber = !string.IsNullOrEmpty(payment.DataVaultToken) ? "" : payment.CardNumber;
                payment.CVC = !string.IsNullOrEmpty(payment.DataVaultToken) ? "" : payment.CVC;
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

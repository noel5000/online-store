using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Common
{
    public enum HttpVerb
    {
        GET,
        POST,
        PUT,
        DELETE,
        PATCH
    }

    public enum Authorization
    {
        NONE = 0,
        BASIC = 1
    }
    public class ClientRestFul
    {
        public string EndPoint { get; set; }
        public HttpVerb Method { get; set; }
        public HttpStatusCode HttpStatusCode { get; set; } = HttpStatusCode.BadRequest;
        public Authorization Authorization { get; set; }
        public string ContentType { get; set; }
        public string PostData { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public string Host { get; set; } = "";
        public Dictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();

        public ClientRestFul()
        {
            EndPoint = "";
            Method = HttpVerb.GET;
            ContentType = "application/json";
            PostData = "";
            this.Authorization = Authorization.NONE;
        }
        public bool AcceptAllCertifications(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        public ClientRestFul(string endpoint)
        {
            EndPoint = endpoint;
            Method = HttpVerb.GET;
            ContentType = "application/json";
            PostData = "";
            this.Authorization = Authorization.NONE;
        }

        public ClientRestFul(string endpoint, HttpVerb method)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            PostData = "";
            this.Authorization = Authorization.NONE;
        }

        public ClientRestFul(string endpoint, HttpVerb method, string postData)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            PostData = postData;
            this.Authorization = Authorization.NONE;
        }
        public ClientRestFul(string endpoint, HttpVerb method, Authorization authorization)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            this.Authorization = authorization;
        }
        public ClientRestFul(string endpoint, HttpVerb method, Authorization authorization, string username, string password)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            this.Authorization = authorization;
            this.Username = username;
            this.Password = password;
        }
        public ClientRestFul(string endpoint, HttpVerb method, string postData, Authorization authorization, string username, string password)
        {
            EndPoint = endpoint;
            Method = method;
            ContentType = "application/json";
            PostData = postData;
            this.Authorization = authorization;
            this.Username = username;
            this.Password = password;
        }

        public string MakeRequest()
        {
            return MakeRequest("");
        }

        public async Task<string> MakeRequestAsync(string parameters, string tenant)
        {
            this.HttpStatusCode = HttpStatusCode.BadRequest;
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            string url = EndPoint + parameters;
            url = url.Last() == '/' ? url.Substring(0, url.Length - 1) : url;
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = Method.ToString();
            request.ContentLength = 0;
            request.ContentType = ContentType;
            switch (this.Authorization)
            {
                case Authorization.BASIC:
                    //  request.Headers.Add($"authorization: basic MjM6YWlsYTIz");
                    request.Headers.Add($"Authorization: Basic {tenant}");
                    break;
            }
            AddRequestHeaders(request);

            if (!string.IsNullOrEmpty(PostData) && (Method == HttpVerb.POST || Method == HttpVerb.PUT || Method == HttpVerb.PATCH))
            {
                var encoding = new UTF8Encoding();
                var bytes = Encoding.GetEncoding("iso-8859-1").GetBytes(PostData);
                request.ContentLength = bytes.Length;

                using (var writeStream = request.GetRequestStream())
                {
                    writeStream.Write(bytes, 0, bytes.Length);
                }
            }

            HttpWebResponse response = null;
            try
            {
                response = (HttpWebResponse)(await request.GetResponseAsync());
            }
            catch (WebException ex)
            {
                response = (HttpWebResponse)ex.Response;
            }
            if (response != null)
                this.HttpStatusCode = response.StatusCode;
            //using (var response = (HttpWebResponse)request.GetResponse())
            //{
            var responseValue = string.Empty;


            //if (response.StatusCode != HttpStatusCode.OK)
            //{
            //    var message = String.Format("Request failed. Received HTTP {0}", response.StatusCode);
            //    throw new ApplicationException(response);
            //}

            // grab the response
            if (response != null)
                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }
            return responseValue;
            //}
        }

        private void AddRequestHeaders(HttpWebRequest request)
        {
            foreach (var header in Headers)
                request.Headers.Add(header.Key, header.Value);
        }

        public async Task<string> MakeRequestAsync(string parameters = "")
        {
            this.HttpStatusCode = HttpStatusCode.BadRequest;
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            string url = EndPoint + parameters;
            url = url.Last() == '/' ? url.Substring(0, url.Length - 1) : url;
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = Method.ToString();
            request.ContentLength = 0;
            request.ContentType = ContentType;
            switch (this.Authorization)
            {
                case Authorization.BASIC:
                    //  request.Headers.Add($"authorization: basic MjM6YWlsYTIz");
                    request.Headers.Add($"Authorization: Basic {StringUtility.ConvertToBase64($"{this.Username}:{this.Password}")}");
                    break;
            }

            AddRequestHeaders(request);

            if (!string.IsNullOrEmpty(PostData) && (Method == HttpVerb.POST || Method == HttpVerb.PUT || Method == HttpVerb.PATCH))
            {
                var encoding = new UTF8Encoding();
                var bytes = Encoding.GetEncoding("iso-8859-1").GetBytes(PostData);
                request.ContentLength = bytes.Length;

                using (var writeStream = request.GetRequestStream())
                {
                    writeStream.Write(bytes, 0, bytes.Length);
                }
            }

            HttpWebResponse response = null;
            try
            {
                response = (HttpWebResponse)(await request.GetResponseAsync());
            }
            catch (WebException ex)
            {
                response = (HttpWebResponse)ex.Response;
            }
            if (response != null)
                this.HttpStatusCode = response.StatusCode;
            //using (var response = (HttpWebResponse)request.GetResponse())
            //{
            var responseValue = string.Empty;


            //if (response.StatusCode != HttpStatusCode.OK)
            //{
            //    var message = String.Format("Request failed. Received HTTP {0}", response.StatusCode);
            //    throw new ApplicationException(response);
            //}

            // grab the response
            if (response != null)
                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }
            return responseValue;
            //}
        }

        public string MakeRequest(string parameters)
        {
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            var request = (HttpWebRequest)WebRequest.Create(EndPoint + parameters);
            request.Method = Method.ToString();
            request.ContentLength = 0;
            request.ContentType = ContentType;
            AddRequestHeaders(request);
            switch (this.Authorization)
            {
                case Authorization.BASIC:
                    //  request.Headers.Add($"authorization: basic MjM6YWlsYTIz");
                    request.Headers.Add($"Authorization: Basic {StringUtility.ConvertToBase64($"{this.Username}:{this.Password}")}");
                    break;
            }


            if (!string.IsNullOrEmpty(PostData) && (Method == HttpVerb.POST || Method == HttpVerb.PUT || Method == HttpVerb.PATCH))
            {
                var encoding = new UTF8Encoding();
                var bytes = Encoding.GetEncoding("iso-8859-1").GetBytes(PostData);
                request.ContentLength = bytes.Length;

                using (var writeStream = request.GetRequestStream())
                {
                    writeStream.Write(bytes, 0, bytes.Length);
                }
            }

            HttpWebResponse response = null;
            try
            {
                response = (HttpWebResponse)request.GetResponse();
            }
            catch (WebException ex)
            {
                response = (HttpWebResponse)ex.Response;
            }

            if (response != null)
                this.HttpStatusCode = response.StatusCode;
            //using (var response = (HttpWebResponse)request.GetResponse())
            //{
            var responseValue = string.Empty;

            /*
            if (response.StatusCode != HttpStatusCode.OK)
            {
                var message = String.Format("Request failed. Received HTTP {0}", response.StatusCode);
                throw new ApplicationException(message);
            }
            */
            // grab the response
            if (response != null)
                using (var responseStream = response.GetResponseStream())
                {
                    if (responseStream != null)
                        using (var reader = new StreamReader(responseStream))
                        {
                            responseValue = reader.ReadToEnd();
                        }
                }
            return responseValue;
            //}
        }

    }
}

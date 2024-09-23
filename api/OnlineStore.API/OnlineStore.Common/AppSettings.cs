namespace OnlineStore.Common
{
    public class AppSettings
    {
        public string Domain { get; set; }
        public string TokenKey { get; set; }
        public short TokenTime { get; set; }
        public string ChainDbKeyToken { get; set; }
        public string AzulServiceUrl { get; set; }
        public string AzulFactor1 { get; set; }
        public string AzulFactor2 { get; set; }
        public string AzulChannel { get; set; }
        public string AzulStore { get; set; }
        public string AzulPosInputMode { get; set; }
        public string CustomerServicePhone { get; set; }
        public string ECommerceURL { get; set; }
        public string MerchantName { get; set; }
    }

    public class EmailSettings 
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public bool Ssl { get; set; }
        public string Replay { get; set; }
        public string From { get; set; }
        public string EmailLogoUrl { get; set; }
    }
}

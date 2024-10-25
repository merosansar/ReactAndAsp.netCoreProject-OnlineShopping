namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class ResponseCode
    {
        public string? Code { get; set; }
        public string? Status { get; set; }
        public string? Message { get; set; }
    }

    public class AccessToken
    {
        public string? JwtToken { get; set; }
        
    }
}

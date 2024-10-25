namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface ITokenComparisonService
    {

        bool CompareJwtTokens(HttpContext httpContext, string userEmail);
    }
}

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface ICookieService
    {
        string GetJwtTokenFromCookie(HttpContext httpContext);
    }
}

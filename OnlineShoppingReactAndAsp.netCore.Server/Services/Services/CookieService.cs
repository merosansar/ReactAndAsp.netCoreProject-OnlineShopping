using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.Services
{
    public class CookieService : ICookieService
    {
        public string GetJwtTokenFromCookie(HttpContext httpContext)
        {
            if (httpContext.Request.Cookies.TryGetValue("jwtToken", out string jwtToken))
            {
                // The cookie exists, and the token is returned
                return jwtToken;
            }

            // If the token doesn't exist, return null or handle accordingly
            return "";
        }
    }
}

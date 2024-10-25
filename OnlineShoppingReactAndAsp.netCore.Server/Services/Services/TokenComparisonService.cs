using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.Services
{
    public class TokenComparisonService(ICookieService cookieService, IUserAuthenticationService userAuthentificationService) : ITokenComparisonService 
    {
        private readonly ICookieService _cookieService = cookieService;
        private readonly IUserAuthenticationService _userAuthentificationService=userAuthentificationService;
        public bool CompareJwtTokens(HttpContext httpContext, string userEmail)
        {
            // Get the token from the browser's cookies
            string cookieToken = _cookieService.GetJwtTokenFromCookie(httpContext);

            if (cookieToken == null)
            {
                return false; // No token in the cookie
            }

            // Get the token from the database
            var databaseToken = _userAuthentificationService.AccessJwtToken("c", userEmail,"" ,"").ToList().FirstOrDefault();

            if (databaseToken == null)
            {
                return false; // No token in the database
            }

            // Compare the tokens
            return  cookieToken == databaseToken.JwtToken;
        }
    }
}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.Services
{
    public class UserAuthenticationService(EshopContext context) : IUserAuthenticationService
    {
        private readonly EshopContext _context = context;

        public List<AccessToken> AccessJwtToken(string flag, string UserName, string PasswordHash, string JwtToken)
        {
            var pflag = new SqlParameter("@Flag", flag);
            var pUserName = new SqlParameter("@UserName", UserName);
            var pPasswordHash = new SqlParameter("@PasswordHash", PasswordHash);
            var pJwtToken = new SqlParameter("@JwtToken", JwtToken);
            return _context.AccessToken.FromSqlRaw("EXECUTE Proc_UserAuthentication @Flag, @UserName,@PasswordHash,@JwtToken", pflag, pUserName, pPasswordHash, pJwtToken).ToList();
        }

        public List<ResponseCode> LoginResponse(string flag, string UserName, string PasswordHash, string JwtToken)
        {
            var pflag = new SqlParameter("@Flag", flag);
            var pUserName = new SqlParameter("@UserName", UserName);
            var pPasswordHash = new SqlParameter("@PasswordHash", PasswordHash);
            var pJwtToken = new SqlParameter("@JwtToken", JwtToken);
            return _context.ResponseCodes.FromSqlRaw("EXECUTE Proc_UserAuthentication @Flag, @UserName,@PasswordHash,@JwtToken", pflag, pUserName, pPasswordHash, pJwtToken).ToList();
        }

        public List<PasswordHashModel> ReturnDecryptPassword(string flag, string UserName, string PasswordHash, string JwtToken)
        {
            var pflag = new SqlParameter("@Flag", flag);
            var pUserName = new SqlParameter("@UserName", UserName);
            var pPasswordHash = new SqlParameter("@PasswordHash", PasswordHash);
            var pJwtToken = new SqlParameter("@JwtToken", JwtToken);
            return _context.PasswordHashModel.FromSqlRaw("EXECUTE Proc_UserAuthentication @Flag,@UserName,@PasswordHash,@JwtToken", pflag, pUserName, pPasswordHash,pJwtToken).ToList();
        }
    }
}

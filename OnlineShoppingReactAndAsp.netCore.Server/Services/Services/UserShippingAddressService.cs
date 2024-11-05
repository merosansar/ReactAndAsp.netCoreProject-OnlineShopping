using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.Services
{
    public class UserShippingAddressService(EshopContext context) : IUserShippingAddressService
    {
        private readonly EshopContext _context = context;
        public List<ResponseCode> ChangeUserShippingAddress(string flag, int? id, int? userId, string emailAddress, string phoneNo, string shippingAddress)
        {
            var pflag = new SqlParameter("@Flag", flag);
            var pid = new SqlParameter("@Id", id);
            var puserId = new SqlParameter("@UserId", userId);
            var pemailAddress = new SqlParameter("@EmailAddress", emailAddress);
            var pphoneNo = new SqlParameter("@PhoneNo", phoneNo);
            var pshippingAddress = new SqlParameter("@ShippingAddress", shippingAddress);
            return _context.ResponseCodes.FromSqlRaw("EXECUTE Proc_UserShippingAddress @Flag,@Id,@UserId,@EmailAddress,@PhoneNo,@ShippingAddress", pflag, pid, puserId, pemailAddress, pphoneNo, pshippingAddress).ToList();
        }
    }
}

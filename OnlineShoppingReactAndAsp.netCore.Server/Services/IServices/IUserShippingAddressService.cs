using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface IUserShippingAddressService
    {
        List<ResponseCode> ChangeUserShippingAddress(string flag, int? id, int? userId, string emailAddress, string phoneNo, string shippingAddress);
    }
}

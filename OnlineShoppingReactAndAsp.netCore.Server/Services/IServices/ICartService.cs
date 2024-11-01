using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface ICartService
    {
       
        List<ResponseCode> ChangeCart(string flag, int Id, int UserId, int CartItemId, int ProductId, int Quantity, decimal Price, bool IsSelected);

        List<Cart> GetCart(string flag, int Id, int UserId, int CartItemId, int ProductId, int Quantity, decimal Price, bool IsSelected);

        List<CartCount> GetCartTotalCount(string flag, int Id, int UserId, int CartItemId, int ProductId, int Quantity, decimal Price, bool IsSelected);
    }
}

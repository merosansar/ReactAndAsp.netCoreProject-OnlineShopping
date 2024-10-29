using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface IProductDetailsService
    {
        List<ProductDetails> GetProductDetails(string flag, int Id, int ProductId, string Description, string Specifications, int BrandId, string ProductModel, string Warranty, string Material, int ColorId, string Dimensions, decimal Weight, DateTime? PromotionStartDate, DateTime? PromotionEndDate, decimal? SpecialPrice);
        List<ResponseCode> ChangeProductDetails(string flag, int Id, int ProductId, string Description, string Specifications, int BrandId, string ProductModel, string Warranty, string Material, int ColorId, string Dimensions, decimal Weight, DateTime? PromotionStartDate, DateTime? PromotionEndDate, decimal? SpecialPrice);
    }
}

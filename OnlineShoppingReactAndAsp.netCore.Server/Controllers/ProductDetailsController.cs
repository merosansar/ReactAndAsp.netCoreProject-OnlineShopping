using Microsoft.AspNetCore.Mvc;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;
using OnlineShoppingReactAndAsp.netCore.Server.Services.Services;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductDetailsController(EshopContext context, IProductDetailsService ProductDetailsService) : ControllerBase
    {
        public readonly EshopContext _context = context;
        private readonly IProductDetailsService _IProductDetailsService = ProductDetailsService;
        //public IActionResult Index()
        //{
        //    return Ok();
        //}
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ProductDetails m)
        {
            DateTime PromotionStartDate = DateTime.Now;
            DateTime PromotionEndDate = DateTime.Now;
            decimal? SpecialPrice = 0;
            var i = _IProductDetailsService.ChangeProductDetails("i", m.Id ?? 0, m.ProductId ?? 0, m.Description ?? "",
               m.Specifications ?? "", m.BrandId ?? 0, m.ProductModel ?? "", m.Warranty ?? "",
               m.Material ?? "", m.ColorId ?? 0, m.Dimensions ?? "", m.Weight ?? 0,
               PromotionStartDate, PromotionEndDate, SpecialPrice).ToList().FirstOrDefault();

            return i != null ? Ok(i.Code) : BadRequest("Error creating product details.");
        }
    }
}

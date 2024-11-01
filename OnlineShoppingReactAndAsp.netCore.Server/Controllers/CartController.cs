using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CartController(EshopContext context, ICartService CartService) : ControllerBase
    {
        public readonly EshopContext _context = context;
        private readonly ICartService _CartService = CartService;
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ProductCart m)
        {
            int? UserId = HttpContext.Session.GetInt32("UserId"); // Retrieve the integer ID from the session
            var i = new Cart();

            if (!UserId.HasValue)
            {
                // Handle case where ID is not in session
                return BadRequest("Login before add product to cart ");
            }
           
            var result = _CartService.ChangeCart("i", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected).ToList().FirstOrDefault();
            if (result == null)
            {
                return BadRequest("Try Again ");
            }
            else
            {
                i.ProductId = m.Id;
                i.Quantity = m.Quantity;
                var cartItemList = _CartService.GetCart("s", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected);
                var count = _CartService.GetCartTotalCount("c", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected).ToList().FirstOrDefault();
                if(count!=null) { HttpContext.Session.SetString("TotalCartCount", count.ToString()); }
                else HttpContext.Session.SetString("TotalCartCount", "");
                return Ok(cartItemList.ToArray());
            }
        }
    }
}

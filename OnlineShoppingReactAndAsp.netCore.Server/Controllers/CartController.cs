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
                string baseUrl = "https://localhost:7096";
                i.ProductId = m.Id;
                i.Quantity = m.Quantity;
                var cartItemList = _CartService.GetCart("s", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected);
                var count = _CartService.GetCartTotalCount("c", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected).ToList().FirstOrDefault();
                if(count!=null) { HttpContext.Session.SetString("TotalCartCount", count.ToString()); }
                else HttpContext.Session.SetString("TotalCartCount", "");
                // Modify ImageUrl in each item using LINQ
                cartItemList = cartItemList.Select(item =>
                {
                    if (!string.IsNullOrEmpty(item.ImageUrl))
                    {
                        item.ImageUrl = baseUrl + item.ImageUrl;
                    }
                    return item;
                }).ToList();
                return Ok(cartItemList);
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] Cart i)
        {
            var m = new ProductCart();
            //var i = new Cart();
            int? UserId = HttpContext.Session.GetInt32("UserId"); // Retrieve the integer ID from the session
            string? code = "";

            var result = _CartService.ChangeCart("d",i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected).FirstOrDefault();
            if (result!= null) { code = result.Code; }
           return Ok(code);
        }


            [HttpGet("cartcount")]
        public async Task<IActionResult> GetCartCount()
        {
            int? UserId = HttpContext.Session.GetInt32("UserId");

            var i = new Cart();
            var m = new ProductCart();
            int? totalCartItem = 0;

            if (!UserId.HasValue)
            {
                // Handle case where ID is not in session
                return BadRequest();
            }
            var count = _CartService.GetCartTotalCount("c", i.Id, UserId ?? 0, i.CartItemId ?? 0, m.Id, m.Quantity, m.Price, i.IsSelected).ToList().FirstOrDefault();
            if (count != null) { totalCartItem = count.TotalCartItem; }
            return Ok(totalCartItem);
        }
    }
}

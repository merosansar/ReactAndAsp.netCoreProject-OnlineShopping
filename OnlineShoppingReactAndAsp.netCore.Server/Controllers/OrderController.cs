using Microsoft.AspNetCore.Mvc;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;
using OnlineShoppingReactAndAsp.netCore.Server.Services.Services;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService orderService, IUserShippingAddressService userShippingAddressService, ICartService CartService) : ControllerBase
    {
        private readonly IOrderService _orderService = orderService;
        private readonly IUserShippingAddressService _userShippingAddress = userShippingAddressService;
        private readonly ICartService _CartService = CartService;

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut( [FromBody] UserShippingAddress request)
        {
            var m = new Order();
            var i = new Cart();
            m.OrderDetails = new OrderDetail();
            var result = new List<ResponseCode>();

            if (request.CartItemList == null || request.CartItemList.Count == 0)
            {
                return BadRequest("No items selected for checkout.");
            }

            int? UserId = HttpContext.Session.GetInt32("UserId");
            if (!UserId.HasValue)
            {

                return BadRequest("User Not Valid");
            }
            var shippingResult = _userShippingAddress.ChangeUserShippingAddress("i", request.Id, UserId, request.EmailAddress, request.PhoneNo, request.ShippingAddress).ToList().FirstOrDefault();
            if (shippingResult != null)
            {
                if (shippingResult.Code == "000")
                {
                    foreach (var item in request.CartItemList)
                    {
                        result = _CartService.ChangeCart("u", item.Id, UserId ?? 0, item.CartItemId ?? 0, item.ProductId, item.Quantity, item.Price, item.IsSelected).ToList();
                       


                    }
                    
                        var orderResult =  _orderService.ChangeOrder('i', m.OrderId, UserId, m.SellerId, m.OrderStatusId, m.TotalAmount, m.PaymentMethodId, m.PaymentStatusId, m.ShippingAddress, m.BillingAddress, m.ShippingMethod, m.TrackingNumber, m.EstimatedDeliveryDate, m.DeliveryDate, m.OrderDetails.ProductId, m.OrderDetails.Quantity, m.OrderDetails.Price, m.OrderDetails.Discount).ToList().FirstOrDefault();

                    return Ok(orderResult.Status);
                }
                return Ok("SUCCESS");
            }



            return Ok("SUCCESS");
        }

        [HttpPost("shippingaddress")]
        public IActionResult ShippingAddress(UserShippingAddress m)
        {
            int? UserId = HttpContext.Session.GetInt32("UserId");
            if (!UserId.HasValue)
            {


                return RedirectToAction("Login", "User");
            }

            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService orderService, IUserShippingAddressService userShippingAddressService) : ControllerBase
    {
        private readonly IOrderService _orderService = orderService;
        private readonly IUserShippingAddressService _userShippingAddress = userShippingAddressService;

        [HttpPost("create")]
        public IActionResult Create()
        {
            var m = new Order();
            m.OrderDetails = new OrderDetail();
            int? UserId = HttpContext.Session.GetInt32("UserId"); 
            if (!UserId.HasValue)
            {
               
                return BadRequest("User Not Valid");
            }
            var i = _orderService.ChangeOrder('i', m.OrderId, UserId, m.SellerId, m.OrderStatusId, m.TotalAmount, m.PaymentMethodId, m.PaymentStatusId, m.ShippingAddress, m.BillingAddress, m.ShippingMethod, m.TrackingNumber, m.EstimatedDeliveryDate, m.DeliveryDate, m.OrderDetails.ProductId, m.OrderDetails.Quantity, m.OrderDetails.Price, m.OrderDetails.Discount).ToList().FirstOrDefault();
            return Ok();
        }

        [HttpPost("shippingaddress")]
        public IActionResult ShippingAddress(UserShippingAddress m)
        {
            int? UserId = HttpContext.Session.GetInt32("UserId"); 
            if (!UserId.HasValue)
            {
             
               
                return RedirectToAction("Login", "User");
            }
            var i = _userShippingAddress.ChangeUserShippingAddress("i", m.Id, UserId, m.EmailAddress, m.PhoneNo, m.ShippingAddress).ToList();
           return Ok();
        }
    }
}

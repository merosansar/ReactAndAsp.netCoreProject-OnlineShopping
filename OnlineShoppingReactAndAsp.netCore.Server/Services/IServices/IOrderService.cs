﻿using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface IOrderService
    {
        List<ResponseCode> ChangeOrder(char? flag, int? id, int? userId, int? sellerId, int? orderStatusId, decimal? totalAmount, int? paymentMethodId, int? paymentStatusId, string shippingAddress, string billingAddress, string shippingMethod, string trackingNumber, DateTime? estimatedDeliveryDate, DateTime? deliveryDate, int? productId, int? quantity, decimal? pricePerUnit, decimal? discount);
        //List<OrderDetailResult> ReturnOrderList(char? flag, int? id, int? userId, int? sellerId, int? orderStatusId, decimal? totalAmount, int? paymentMethodId, int? paymentStatusId, string shippingAddress, string billingAddress, string shippingMethod, string trackingNumber, DateTime? estimatedDeliveryDate, DateTime? deliveryDate, int? productId, int? quantity, decimal? pricePerUnit, decimal? discount);
    }
}

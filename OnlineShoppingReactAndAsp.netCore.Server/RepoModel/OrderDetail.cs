﻿namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class OrderDetail
    {

        public int OrderDetailId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
    }
}

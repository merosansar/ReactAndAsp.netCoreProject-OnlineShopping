﻿namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class CartItem
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int ProductId { get; set; }
        public int CartItemId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; } = null!;      

        public bool? IsSelected { get; set; }
        public int? CartStatusId { get; set; }
        public string? ProductDescription { get; set; }
        public string? ProductModel { get; set; }
        public string? ProductName { get; set; } 
        public int? Brand { get; set; }
        public string? Color { get; set; }     
        public decimal? Weight { get; set; }

    

     


       
    }
}
namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class ProductCart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; } // Change to IFormFile
        public decimal Price { get; set; } // Change to IFormFile
        public int Quantity { get; set; }
    }
}

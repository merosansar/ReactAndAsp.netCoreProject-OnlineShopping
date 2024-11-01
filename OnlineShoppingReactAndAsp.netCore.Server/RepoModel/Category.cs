namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class Category
    {
        public int Id { get; set; }

        public string Description { get; set; }
        public IFormFile ImageUrl { get; set; } // Change to IFormFile
    }
}

using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class ProductDetails
    {
        public int? Id { get; set; }
        public int? ProductId { get; set; }
        [Display(Name = "Detail Description")]
        public string? Description { get; set; }
        public string? Specifications { get; set; }

        public int? BrandId { get; set; }
        public string? ProductModel { get; set; }
        public string? Warranty { get; set; }
        public string? Material { get; set; }
        public int? ColorId { get; set; }
        public string?  Dimensions { get; set; }
        public int? Length { get; set; }

        public int? Width { get; set; }
        public int? Height { get; set; }
        public decimal? Weight { get; set; }
     

   
    }
}

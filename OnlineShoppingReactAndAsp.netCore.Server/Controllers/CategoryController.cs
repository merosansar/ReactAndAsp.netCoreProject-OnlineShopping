using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;
using OnlineShoppingReactAndAsp.netCore.Server.Services.Services;
//using static OnlineShoppingReactAndAsp.netCore.Server.Controllers.UserController;
using static System.Net.Mime.MediaTypeNames;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController(EshopContext context, ICategoryService categoryService, ITokenComparisonService tokenComparisionService) : ControllerBase
    {
        private readonly EshopContext _context = context;
        private readonly ICategoryService _categoryService = categoryService;
        private readonly ITokenComparisonService _tokenComparisionService = tokenComparisionService;
        // GET: CategoryController


        [HttpPost("add")]
        public async Task<IActionResult> Add([FromForm] string id, [FromForm] string description, [FromForm] IFormFile image)
        {

            var result = await _categoryService.AddCategoryAsync("u", Convert.ToInt32(id), "", description, image);
            return Ok(result);


        }
        // POST: CategoryController/Create
        [HttpGet("index")] // Accessible as 'api/category/index'
        public ActionResult Index(int page = 1, int pageSize = 5)
        {
            var List = new List<ProductCart>();

            var result = (from p in _context.TblProducts
                          join c in _context.TblCategories on p.CategoryId equals c.Id
                          select new
                          {
                              ProductName = p.Name,
                              CategoryId = p.CategoryId,
                              Price = p.Price,
                              ImageUrl = p.ImageUrl,
                              Quantity = p.Quantity,
                              Id = p.Id,
                          })
                          .Skip((page - 1) * pageSize)  // Skip records based on page
                          .Take(pageSize)               // Take only pageSize records
                          .ToList();

            foreach (var item in result)
            {
                var m = new ProductCart
                {
                    Name = item.ProductName,
                    Price = item.Price,
                    ImageUrl = "https://localhost:7096" + item.ImageUrl,
                    Quantity = item.Quantity,
                    Id = item.Id
                };
                List.Add(m);
            }

            return Ok(List);
        }


        [HttpGet("searchproduct")] // Accessible as 'api/category/index'
        public async Task<ActionResult> SearchProduct([FromQuery] string SearchText)
        {
            var List = new List<ProductCart>();

            var result = _context.TblProducts
                       .Join(_context.TblCategories,
                             p => p.CategoryId,
                             c => c.Id,
                             (p, c) => new
                             {
                                 ProductName = p.Name,
                                 CategoryId = p.CategoryId,
                                 Price = p.Price,
                                 ImageUrl = p.ImageUrl,
                                 Quantity = p.Quantity
                             })
                       .Where(p => string.IsNullOrEmpty(SearchText) || EF.Functions.Like(p.ProductName, $"%{SearchText}%"))
                       .ToList();

            foreach (var item in result)
            {
                var m = new ProductCart
                {
                    Name = item.ProductName,
                    Price = item.Price,
                    ImageUrl = "https://localhost:7096" + item.ImageUrl,
                    Quantity = item.Quantity
                };
                List.Add(m);
            }
            return Ok(List.ToArray());
        }

        // GET: CategoryController/Details/5
        public ActionResult Details(int id)
        {
            return Ok();
        }

        // GET: CategoryController/Create
        public ActionResult Create()
        {
            return Ok();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // GET: CategoryController/Edit/5
        public ActionResult Edit(int id)
        {
            return Ok();
        }

        // POST: CategoryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return Ok();
            }
            catch
            {
                return Ok();
            }
        }

        // GET: CategoryController/Delete/5
        public ActionResult Delete(int id)
        {
            return Ok();
        }

        // POST: CategoryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return Ok();
            }
            catch
            {
                return Ok();
            }
        }

        //public class Category
        //{
        //    public int Id { get; set; }

        //    public string Description { get; set; }
        //    public IFormFile ImageUrl { get; set; } // Change to IFormFile
        //}
        //public class ProductCat
        //{
        //    public int Id { get; set; }

        //    public string Name { get; set; }
        //    public string ImageUrl { get; set; } // Change to IFormFile
        //    public decimal Price { get; set; } // Change to IFormFile
        //    public int Quantity { get; set; }

        //}
    }
}

using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.Services.IServices;
using OnlineShoppingReactAndAsp.netCore.Server.Services.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace OnlineShoppingReactAndAsp.netCore.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(EshopContext context, IUserAuthenticationService authentication, EncryptionDecryptionFun encryptdecrypt, IConfiguration configuration) : ControllerBase
    {
        public readonly EshopContext _context = context;
        private readonly IUserAuthenticationService Authentication = authentication;
        private readonly EncryptionDecryptionFun EncryptDecrypt = encryptdecrypt;
        private readonly IConfiguration _configuration = configuration;


        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] UserRegisterDto model)
        {
            if (ModelState.IsValid)
            {
                var result = await _context.Database.ExecuteSqlRawAsync("EXEC Proc_User @Flag = 'i', @UserName = {0}, @Email = {1}, @PasswordHash = {2}, @FullName = {3}, @Dob = {4}, @GenderId = {5}",
                    model.Email, model.Email, model.PasswordHash, model.FullName, model.Dob, model.GenderId);

                if (result < 0)
                {
                    return Ok(new { token = "fake-jwt-token" }); // You can replace this with actual token logic
                }
                return BadRequest("Registration failed.");
            }

            return BadRequest(ModelState);
        }


        [HttpGet("get")]
        public IEnumerable<TblUser> GetUser() {

            var i = _context.TblUsers.ToList();
            return i.ToArray();
        }

        [HttpGet("edit/{id}")]
        public IActionResult Edit(int id)
        {
            var user = _context.TblUsers.Find(id);
            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }
            return Ok(user); // Return the user data to the front-end
        }

        // POST: api/user/edit - Update the user
        [HttpPost("edit")]
        public IActionResult Edit([FromBody] UserRegisterDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors if any
            }

            var existingUser = _context.TblUsers.Find(user.Id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update user details
            existingUser.UserName = user.Email;
            existingUser.Email = user.Email;
            existingUser.PasswordHash = user.PasswordHash; // Or hash a new password

            _context.SaveChanges(); // Save changes to the database

            return Ok(existingUser); // Return the updated user
        }

        [HttpGet("detail/{id}")]
        public IActionResult Detail(int id)
        {
            var user = _context.TblUsers.Find(id);
            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }
            return Ok(user); // Return the user data to the front-end
        }
        [HttpGet("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var user = _context.TblUsers.Find(id);
           
            if (user == null)
            {
                return NotFound(); // Return 404 if user not found
            }
            _context.TblUsers.Remove(user);
            _context.SaveChanges(); // Save changes to the database
            return Ok(user); // Return the user data to the front-end
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel u)
        {
            var m = Authentication.ReturnDecryptPassword("s", u.Email ?? "", u.PasswordHash ?? "",u.JwtToken).ToList().FirstOrDefault();        
           
            var i = Authentication.LoginResponse("a", u.Email ?? "", u.PasswordHash ?? "",u.JwtToken).ToList().FirstOrDefault();
            if (i != null)
            {
                if (i.Code == "000")
                {

                    if (m != null)
                    {
                        HttpContext.Session.SetInt32("UserId", m.Id);
                        HttpContext.Session.SetString("FullName", m.FullName ?? "");
                    }


                    // Create JWT token
                    var tokenHandler = new JwtSecurityTokenHandler();                  

                    // Retrieve the secret key from appsettings.json
                    var secretKey = _configuration["JwtSettings:SecretKey"];
                    var key = Encoding.ASCII.GetBytes(secretKey);  // Convert secret key to bytes
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, u.Email) }),
                        Expires = DateTime.UtcNow.AddHours(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);
                    // Define cookie options
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = false, // Ensure it's not accessible via JavaScript
                        Secure = true,   // Ensure it's sent over HTTPS only
                        Expires = DateTime.UtcNow.AddHours(1), // Set cookie expiration to match the token's
                        SameSite = SameSiteMode.Strict, // Prevent CSRF attacks
                        Path = "/" // Path where the cookie is accessible
                    };
                    // Add the token to cookies
                    HttpContext.Response.Cookies.Append("jwtToken", tokenString, cookieOptions);
                    var  updateToken = Authentication.LoginResponse("u", u.Email ?? "", u.PasswordHash ?? "", tokenString).ToList().FirstOrDefault();
                    if (updateToken != null) 
                    {
                        if( updateToken.Code=="000")

                        {
                            HttpContext.Session.SetString("UserName", u.Email ?? "");
                            return Ok(new { message = "SUCCESS" });
                        }                           

                    }
                    // Return a success response
                    return BadRequest(new { message = "Login not  successful" });                    
                }
            }
            return BadRequest();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Clear the JWT token from the cookie
            Response.Cookies.Delete("jwtToken");

            // Clear the session data
            HttpContext.Session.Remove("UserId");
            HttpContext.Session.Remove("FullName");
            HttpContext.Session.Remove("UserName");

            // Optionally, you can also set the session to expire
            HttpContext.Session.Clear();

            // Return a response indicating successful logout
            return Ok(new { message = "Logged out successfully" });
        }
        public class UserRegisterDto
        {
            public int Id { get; set; }
            public string Email { get; set; }
            public string PasswordHash { get; set; }
            public string FullName { get; set; }
            public DateTime Dob { get; set; }
            public int GenderId { get; set; }
        }
        public class LoginModel
        {
            public string Email { get; set; }
            public string PasswordHash { get; set; }
            public string JwtToken { get; set; }
        }
    }
}

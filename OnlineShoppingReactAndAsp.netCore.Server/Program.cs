using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using OnlineShoppingReactAndAsp.netCore.Server.Models;
using OnlineShoppingReactAndAsp.netCore.Server.ServiceRepo;
using OnlineShoppingReactAndAsp.netCore.Server.UtilitySservice;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


// Retrieve JWT settings from appsettings.json
var jwtSettings = builder.Configuration.GetSection("JwtSettings");// Purpose: This line extracts the section "JwtSettings" from the appsettings.json file.
//The Configuration object is used to access configuration settings in ASP.NET Core, and the GetSection("JwtSettings") method retrieves the specific section of the configuration file where your JWT-related settings are stored (like SecretKey, Issuer, Audience, etc.).
var secretKey = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]);//Purpose: This line retrieves the value of the "SecretKey" from the JwtSettings section and converts it into a byte array using Encoding.ASCII.GetBytes.
//The "SecretKey" is used as the cryptographic key to sign and validate JWT tokens. It ensures that tokens cannot be tampered with, as only the server knows this secret key.
//jwtSettings["SecretKey"]: This accesses the SecretKey value from the jwtSettings object, which is a string (e.g., "your_generated_secret_key").
//Encoding.ASCII.GetBytes: Converts the secret key string into a byte array, as this is the format required for cryptographic operations




builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true, // Ensure token hasn't expired
        ClockSkew = TimeSpan.Zero // Optional: prevents extra leeway on expiration time
    };
});

builder.Services.AddDistributedMemoryCache(); // In-memory cache for storing session data
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(60); // Set session timeout
    options.Cookie.HttpOnly = true; // Make the session cookie HTTP-only
    options.Cookie.IsEssential = true; // Mark the session cookie as essential
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
       
    });
});

// Database connection (adjust your connection string)
builder.Services.AddDbContext<EshopContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddScoped<Dropdown>();
builder.Services.AddRepositoryServices();
//Add authentication services here if needed
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();



// Enable session
app.UseSession();


// Use CORS before routing
app.UseCors("AllowReactApp");
app.UseRouting();

// Use authentication middleware if needed
 app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
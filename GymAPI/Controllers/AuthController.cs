using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GymAPI.DAOs;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        private UserManager<User> _userManager;
        private GymContext _context;

        public AuthController(GymContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }
        
        // POST api/auth/login
        [Route("/api/[controller]/login")]
        public async Task<ActionResult> LoginUser([FromBody] LoginDAO loginInfo)
        {
            var user = await _userManager.FindByNameAsync(loginInfo.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginInfo.Password))
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsASuperSecurePassword"));

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");
                var roles = await _userManager.GetRolesAsync(user);
                claimsIdentity.AddClaims(roles.Select(role => new Claim(ClaimTypes.Role, role)));
                var token = new JwtSecurityToken(
                    issuer: "https://gym-lds.herokuapp.com/",
                    audience: "https://gym-lds.herokuapp.com/",
                    expires: DateTime.UtcNow.AddHours(1),
                    claims: claimsIdentity.Claims,
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    userType = user.Role,
                });
            }
            
            return Unauthorized();
        }

    }
}
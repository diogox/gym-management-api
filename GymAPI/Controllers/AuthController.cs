using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
        
        // POST auth/login
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

                var token = new JwtSecurityToken(
                    issuer: "http://localhost:5001", // TODO: Change this after launching to the cloud
                    audience: "http://localhost:5001",
                    expires: DateTime.UtcNow.AddHours(1),
                    claims: claims,
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            
            return Unauthorized();
        }
        
        // POST auth/signup
        [Route("/api/[controller]/signup")]
        public async Task<ActionResult> SignupUser([FromBody] SignupDAO signupInfo)
        {
            // Check username overlap
            var user = await _userManager.FindByNameAsync(signupInfo.Username);
            if (user != null)
            {
                return BadRequest("Username already exists!");
            }
            
            // Create user
            User newUser = new User()
            {
                UserName = signupInfo.Username,
                Email = signupInfo.Email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(newUser, signupInfo.Password);
            
            if (!result.Succeeded)
            {
                return BadRequest("Failed to create user! Probably a password validation error!");
            }
            return Ok();
        }

    }
}
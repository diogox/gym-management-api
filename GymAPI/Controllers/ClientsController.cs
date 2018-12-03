using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GymAPI.DAOs;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Staff")] 
    public class ClientsController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IClientsService _clientsService;
        private readonly IAuthorizationsService _authService;

        public ClientsController(IClientsService clientsService, UserManager<User> userManager, IAuthorizationsService authService)
        {
            _clientsService = clientsService;
            _userManager = userManager;
            _authService = authService;
        }

        // GET api/clients
        [HttpGet]
        public ActionResult<List<Client>> GetAllClients()
        {
            return Ok(_clientsService.GetAll());
        }

        // GET api/clients/{id}
        [HttpGet("{id}", Name = "GetClient")]
        [AllowAnonymous]
        public async Task<ActionResult<Client>> GetClient(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);

            if ( !(_isAdmin || _isStaff) )
            {
                if (! await _authService.CheckIfCurrentClient(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        // GET api/clients/{id}/check-in
        /// <summary>
        /// Checks-in the client. Can only be done once day.
        /// </summary>
        [HttpGet("{id}/check-in")]
        [AllowAnonymous]
        public async Task<ActionResult<Client>> ClientCheckIn(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);

            if ( !(_isAdmin || _isStaff) )
            {
                if (! await _authService.CheckIfCurrentClient(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }

            var success = _clientsService.CheckIn(client);
            if (!success)
            {
                return BadRequest("The client has already checked in today!");
            }
            return Ok(client);
        }
        
        // POST api/clients
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> SignupClient([FromBody] SignupClientDAO signupInfo)
        {
            // Check username overlap
            var user = await _userManager.FindByNameAsync(signupInfo.Username);
            if (user != null)
            {
                return BadRequest("Username already exists!");
            }
                
            // Create client
            var client = new Client()
            {
                Nif = signupInfo.Nif,
                FirstName = signupInfo.FirstName,
                LastName = signupInfo.LastName,
                ImageUrl = signupInfo.ImageUrl,
                BirthDate = signupInfo.BirthDate,
                Age = signupInfo.Age,
                HeightInMeters = signupInfo.HeightInMeters,
                WeightInKg = signupInfo.WeightInKg,
            };
            _clientsService.Create(client);
            
            // Create user
            User newUser = new User()
            {
                UserName = signupInfo.Username,
                Email = signupInfo.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                ClientId = client.Id,
                Role = UserRole.Client,
            };
            var result = await _userManager.CreateAsync(newUser, signupInfo.Password);
            
            if (!result.Succeeded)
            {
                _clientsService.Delete(client);
                return BadRequest("Failed to create user! Probably a password validation error!");
            }
            
            await _userManager.AddToRoleAsync(newUser, "Client");
            
            return CreatedAtRoute("GetClient", new { id = client.Id}, client);
        }

        // PUT api/clients/{id}
        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> UpdateClients(long id,[FromBody] Client client)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);

            if ( !(_isAdmin || _isStaff) )
            {
                if (! await _authService.CheckIfCurrentClient(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var oldClient = _clientsService.GetById(id);
            if (oldClient== null)
            {
                return NotFound();
            }
            
            _clientsService.Update(oldClient, client);
            return NoContent();
        }

        // DELETE api/clients/{id}
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult> DeleteClients(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);

            if ( !(_isAdmin || _isStaff) )
            {
                if (! await _authService.CheckIfCurrentClient(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }
            
            _clientsService.Delete(client);
            return NoContent();
        }
    }
}
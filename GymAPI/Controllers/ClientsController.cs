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
    [Authorize(Roles = "Admin, Staff, Trainer")] 
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
            var _isTrainer = _authService.CheckIfTrainer(User);

            if ( !(_isAdmin || _isStaff || _isTrainer) )
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
        
        // GET api/clients/{id}/notifications
        [HttpGet("{id}/notifications")]
        [AllowAnonymous]
        public async Task< ActionResult< List<ClientNotification> > > GetClientNotifications(long id)
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
            
            return Ok(client.Notifications);
        }
        
        // GET api/clients/{clientId}/notifications/{notificationId}/read
        [HttpGet("{clientId}/notifications/{notificationId}/read")]
        [AllowAnonymous]
        public async Task< ActionResult > GetClientNotifications(long clientId, long notificationId)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);

            if ( !(_isAdmin || _isStaff) )
            {
                if (! await _authService.CheckIfCurrentClient(HttpContext, clientId))
                {
                    return Forbid();
                }
            }
            
            var client = _clientsService.GetById(clientId);
            if (client == null)
            {
                return NotFound();
            }

            var _notification = client.Notifications.Find(notification => notification.Id == notificationId);
            _clientsService.MarkNotificationAsRead(_notification);
            return Ok();
        }
        
        // GET api/clients/{id}/tickets
        [HttpGet("{id}/tickets")]
        [AllowAnonymous]
        public async Task< ActionResult< List<ClientNotification> > > GetClientTickets(long id)
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
            
            return Ok(client.SupportTickets);
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
        
        // POST api/clients/{id}/notifications
        [HttpPost("{id}/notifications")]
        public ActionResult AddNotificationToClient(long id, [FromBody] ClientNotificationDAO notification)
        {
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }

            _clientsService.AddNotification(client, notification);
            return Ok(client);
        }
        
        // POST api/clients/{id}/tickets
        [HttpPost("{id}/tickets")]
        public ActionResult SwitchTrainingPlan(long id, [FromBody] SwitchPlanDAO planIdObj)
        {
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }

            var success = _clientsService.UpdatePlan(client, planIdObj.PlanId);
            if (success)
            {
                return Ok(client);
            }
            else
            {
                return BadRequest("The training plan doesn't exist!");
            }
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

            // Check for training plan changes
            if (oldClient.TrainingPlanId != client.TrainingPlanId)
            {
                _clientsService.AddNotification(oldClient, new ClientNotificationDAO()
                {
                    Title = "Novo Plano de Treino Atribuído.",
                    Message = "Foi-lhe atribuído um novo plano de treino. Vá a \"Plano Treino\" no seu menu para visualiza-lo."
                });
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
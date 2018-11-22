using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : Controller
    {
        private readonly IClientsService _clientsService;

        public ClientsController(IClientsService clientsService)
        {
            _clientsService = clientsService;
        }

        // GET api/clients
        [HttpGet]
        public ActionResult<List<Client>> GetAllClients()
        {
            return Ok(_clientsService.GetAll());
        }

        // GET api/clients/{id}
        [HttpGet("{id}", Name = "GetClient")]
        public ActionResult<Client> GetClient(long id)
        {
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
        public ActionResult<Client> ClientCheckIn(long id)
        {
            var client = _clientsService.GetById(id);
            if (client == null)
            {
                return NotFound();
            }

            _clientsService.CheckIn(client);
            return Ok(client);
        }
        
        // POST api/clients
        [HttpPost]
        public ActionResult RegisterClients([FromBody] Client client)
        {
            _clientsService.Create(client);
            
            return CreatedAtRoute("GetClient", new { id = client.Id}, client);
        }

        // PUT api/clients/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateClients(long id,[FromBody] Client client)
        {
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
        public ActionResult DeleteClients(long id)
        {
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
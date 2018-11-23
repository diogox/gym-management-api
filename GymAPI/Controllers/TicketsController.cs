using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : Controller
    {
        private readonly ISupportTicketsService _supportTicketService;

        public TicketsController (ISupportTicketsService supportTicketService)
        {
            _supportTicketService = supportTicketService;
        }

        // GET api/tickets
        [HttpGet]
        public ActionResult<List<SupportTicket>> GetAllTickets()
        {
            return Ok(_supportTicketService.GetAll());
        }

        // GET api/tickets/{id}
        [HttpGet("{id}", Name = "GetSupportTicket")]
        public ActionResult<SupportTicket> GetTicket(long id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        // POST api/tickets
        [HttpPost]
        public ActionResult CreateTicket([FromBody] SupportTicket ticket)
        {
            _supportTicketService.Create(ticket);
            
            return CreatedAtRoute("GetSupportTicket", new { id = ticket.Id }, ticket);
        }

        // PUT api/tickets/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTicket(int id,[FromBody] SupportTicket ticket)
        {
            var oldTicket= _supportTicketService.GetById(id);
            if (oldTicket == null)
            {
                return NotFound();
            }
            
            _supportTicketService.Update(oldTicket, ticket);
            return NoContent();
        }

        // DELETE api/tickets/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTicket(int id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }
            
            _supportTicketService.Delete(ticket);
            return NoContent();
        }
    }
}
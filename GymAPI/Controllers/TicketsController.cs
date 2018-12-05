using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
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

        // GET api/tickets/{id}/messages
        [HttpGet("{id}/messages")]
        public ActionResult<SupportTicketMessage> GetTicketMessages(long id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }

            var messages = _supportTicketService.GetMessages(ticket);
            if (messages == null)
            {
                return NoContent();
            }
            return Ok(messages);
        }
        
        // GET api/tickets/{id}/messages/{messageId}
        [HttpGet("{id}/messages/{messageId}", Name = "GetSupportTicketMessage")]
        public ActionResult<SupportTicketMessage> GetTicketMessages(long id, long messageId)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }

            var message = _supportTicketService.GetMessageById(ticket, messageId);
            return Ok(message);
        }
        
        // GET api/tickets/{id}/open
        [HttpGet("{id}/open")]
        public ActionResult<SupportTicketMessage> OpenTicket(long id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _supportTicketService.Open(ticket);
            return Ok();
        }
        
        // GET api/tickets/{id}/suspend
        [HttpGet("{id}/suspend")]
        public ActionResult<SupportTicketMessage> SuspendTicket(long id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _supportTicketService.Suspend(ticket);
            return Ok();
        }
        
        // GET api/tickets/{id}/close
        [HttpGet("{id}/close")]
        public ActionResult<SupportTicketMessage> CloseTicket(long id)
        {
            var ticket = _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }

            _supportTicketService.Close(ticket);
            return Ok();
        }
        
        // POST api/tickets
        [HttpPost]
        public ActionResult CreateTicket([FromBody] SupportTicket ticket)
        {
            _supportTicketService.Create(ticket);
            
            return CreatedAtRoute("GetSupportTicket", new { id = ticket.Id }, ticket);
        }
        
        // POST api/tickets/{id}/messages
        [HttpPost("{id}/messages")]
        public ActionResult AddMessageToTicket(long id,[FromBody] SupportTicketMessage message)
        {
            var ticket= _supportTicketService.GetById(id);
            if (ticket == null)
            {
                return NotFound();
            }
            
            _supportTicketService.AddMessage(ticket, message);
            return CreatedAtRoute("GetSupportTicketMessage", new { id = message.Id, messageId = message.Id }, message);
        }

        // PUT api/tickets/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTicket(long id,[FromBody] SupportTicket ticket)
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
        public ActionResult DeleteTicket(long id)
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
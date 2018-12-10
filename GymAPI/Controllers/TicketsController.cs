using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Staff, Trainer")]
    public class TicketsController : Controller
    {
        private readonly ISupportTicketsService _supportTicketService;
        private readonly IClientsService _clientsService;
        private readonly IAuthorizationsService _authService;

        public TicketsController (ISupportTicketsService supportTicketService, IClientsService clientsService, IAuthorizationsService authService)
        {
            _supportTicketService = supportTicketService;
            _clientsService = clientsService;
            _authService = authService;
        }

        // GET api/tickets
        [HttpGet]
        public ActionResult<List<SupportTicket>> GetAllTickets()
        {
            return Ok(_supportTicketService.GetAll());
        }

        // GET api/tickets/{id}
        [HttpGet("{id}", Name = "GetSupportTicket")]
        [AllowAnonymous]
        public async Task<ActionResult<SupportTicket>> GetTicket(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            var ticket = _supportTicketService.GetById(id);
            
            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (ticket != null)
                {
                    var isSameClient = await _authService.CheckIfCurrentClient(HttpContext, ticket.ClientId);
                    if (!isSameClient)
                    {
                        return Forbid();
                    }
                }
                else
                {
                    return Forbid();
                }
            }
            
            if (ticket == null)
            {
                return NotFound();
            }
            
            return Ok(ticket);
        }

        // GET api/tickets/{id}/messages
        [HttpGet("{id}/messages")]
        [AllowAnonymous]
        public async Task<ActionResult<SupportTicketMessage>> GetTicketMessages(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            var ticket = _supportTicketService.GetById(id);
            
            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (ticket != null)
                {
                    var isSameClient = await _authService.CheckIfCurrentClient(HttpContext, ticket.ClientId);
                    if (!isSameClient)
                    {
                        return Forbid();
                    }
                }
                else
                {
                    return Forbid();
                }
            }
            
            
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
        [AllowAnonymous]
        public async Task<ActionResult<SupportTicketMessage>> GetTicketMessages(long id, long messageId)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            var ticket = _supportTicketService.GetById(id);
            
            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (ticket != null)
                {
                    var isSameClient = await _authService.CheckIfCurrentClient(HttpContext, ticket.ClientId);
                    if (!isSameClient)
                    {
                        return Forbid();
                    }
                }
                else
                {
                    return Forbid();
                }
            }
            
            
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
        [AllowAnonymous]
        public async Task<ActionResult> CreateTicket([FromBody] SupportTicket ticket)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);
            
            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (ticket != null)
                {
                    var isSameClient = await _authService.CheckIfCurrentClient(HttpContext, ticket.ClientId);
                    if (!isSameClient)
                    {
                        return Forbid();
                    }
                }
                else
                {
                    return Forbid();
                }
            }
            
            _supportTicketService.Create(ticket);
            
            return CreatedAtRoute("GetSupportTicket", new { id = ticket.Id }, ticket);
        }
        
        // POST api/tickets/{id}/messages
        [HttpPost("{id}/messages")]
        [AllowAnonymous]
        public async Task<ActionResult> AddMessageToTicket(long id,[FromBody] SupportTicketMessage message)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            var ticket = _supportTicketService.GetById(message.SupportTicketId);
            
            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (ticket != null)
                {
                    var isSameClient = await _authService.CheckIfCurrentClient(HttpContext, ticket.ClientId);
                    if (!isSameClient)
                    {
                        return Forbid();
                    }
                }
                else
                {
                    return Forbid();
                }
            }
            
            if (ticket == null)
            {
                return NotFound();
            }

            var client = _clientsService.GetById(ticket.ClientId);
            
            // If the current message is not from the client. Notify him.
            if (message.From != SupportTicketMessageSender.Client )
            {
                _clientsService.AddNotification(client, new ClientNotificationDAO()
                {
                    Title = "Nova mensagem",
                    Message = "Tem uma nova mensagem no seu ticket de suporte.",
                });
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
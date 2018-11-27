using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    
    public interface ISupportTicketsService
    {
        List<SupportTicket> GetAll();
        SupportTicket GetById(long id);
        void AddMessage(SupportTicket ticket, SupportTicketMessage message);
        List<SupportTicketMessage> GetMessages(SupportTicket ticket);
        SupportTicketMessage GetMessageById(SupportTicket ticket, long messageId);
        void Create(SupportTicket ticket);
        void Update(SupportTicket oldTicket, SupportTicket ticket);
        void Delete(SupportTicket ticket);
    }
    
    public class SupportTicketsService: ISupportTicketsService
    {
        private readonly GymContext _context;

        public SupportTicketsService(GymContext context)
        {
            _context = context;
        }
        
        public List<SupportTicket> GetAll()
        {
            return _IncludeAllInfo().ToList();
        }

        public SupportTicket GetById(long id)
        {
            return _IncludeAllInfo().SingleOrDefault(ticket => ticket.Id == id);
        }

        private IQueryable<SupportTicket> _IncludeAllInfo()
        {
            return _context.SupportTickets
                .Include(ticket => ticket.Client)
                .Include(ticket => ticket.Messages);
        }

        public void AddMessage(SupportTicket ticket, SupportTicketMessage message)
        {
            message.At = DateTime.Now;
            
            ticket.Messages.Add(message);
            _context.SaveChanges();
        }

        public List<SupportTicketMessage> GetMessages(SupportTicket ticket)
        {
            return ticket.Messages.ToList();
        }
        
        public SupportTicketMessage GetMessageById(SupportTicket ticket, long messageId)
        {
            return ticket.Messages.SingleOrDefault(message => message.Id == messageId);
        }
        
        public void Create(SupportTicket ticket)
        {
            ticket.Client = null; // ClientId initializes this field
            ticket.OpenedAt = DateTime.Now;
            
            _context.SupportTickets.Add(ticket);
            _context.SaveChanges();
        }

        public void Update(SupportTicket oldTicket, SupportTicket ticket)
        {
            oldTicket.Title = ticket.Title;
            oldTicket.Messages = ticket.Messages;
            oldTicket.ClientId = ticket.ClientId;
            oldTicket.State = ticket.State;
            
            _context.SaveChanges();
        }

        public void Delete(SupportTicket ticket)
        {
            _context.SupportTickets.Remove(ticket);
            _context.SaveChanges();
        }
    }
}
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
            return _IncludeAllInfo().Single(ticket => ticket.Id == id);
        }

        private IQueryable<SupportTicket> _IncludeAllInfo()
        {
            return _context.SupportTickets
                .Include(ticket => ticket.Client);
        }

        public void Create(SupportTicket ticket)
        {
            ticket.Client = null; // ClientId initializes this field   
            _context.SupportTickets.Add(ticket);
            _context.SaveChanges();
        }

        public void Update(SupportTicket oldTicket, SupportTicket ticket)
        {
            oldTicket.Message = ticket.Message;
            oldTicket.ClientId = ticket.ClientId;
            
            _context.SaveChanges();
        }

        public void Delete(SupportTicket ticket)
        {
            _context.SupportTickets.Remove(ticket);
            _context.SaveChanges();
        }
    }
}
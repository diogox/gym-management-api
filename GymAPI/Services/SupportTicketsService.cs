using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;

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
            
            _context.SupportTickets.Add(new SupportTicket
            {
                Message = "Uma das elipticas está estragada.",
                Client = new Client
                {
                    FirstName = "Inês",
                }
            });
            _context.SaveChanges();
        }
        
        public List<SupportTicket> GetAll()
        {
            return _context.SupportTickets.ToList();
        }

        public SupportTicket GetById(long id)
        {
            return _context.SupportTickets.Find(id);
        }

        public void Create(SupportTicket ticket)
        {
            _context.SupportTickets.Add(ticket);
            _context.SaveChanges();
        }

        public void Update(SupportTicket oldTicket, SupportTicket ticket)
        {
            oldTicket.Id = ticket.Id;
            
            _context.SupportTickets.Update(oldTicket);
            _context.SaveChanges();
        }

        public void Delete(SupportTicket ticket)
        {
            _context.SupportTickets.Remove(ticket);
            _context.SaveChanges();
        }
    }
}
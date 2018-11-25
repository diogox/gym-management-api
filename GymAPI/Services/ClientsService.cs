using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface IClientsService
    {
        //Staff Authenticate(string username, string password);
        List<Client> GetAll();
        Client GetById(long id);
        bool CheckIn(Client client);
        void Create(Client client);
        void Update(Client oldClient, Client client);
        void Delete(Client client);
    }
    
    public class ClientsService : IClientsService
    {
        private readonly GymContext _context;

        public ClientsService(GymContext context)
        {
            _context = context;
        }


        public List<Client> GetAll()
        {
            return _IncludeAllInfo()
                .ToList();
        }

        public Client GetById(long id)
        {
            return _IncludeAllInfo()
                .SingleOrDefault(client => client.Id == id);
        }

        private IQueryable<Client> _IncludeAllInfo()
        {
            return _context.Clients
                .Include(client => client.TrainingPlan)
                .Include(client => client.CheckInHistory)
                .Include(client => client.Notifications);
        }

        public bool CheckIn(Client client)
        {
            if (client.CheckInHistory.Count == 0)
            {
                _CheckIn(client);
                return true;
            }
            
            var today = DateTime.Now;
            var lastEntryDateTime = client.CheckInHistory.Last().At;
            
            // Check if the client has checked-in today
            // It only takes the date portion. The hours will be 12:00:00 when comparing
            if ( lastEntryDateTime.Date != today.Date )
            {
                _CheckIn(client);
                return true;
            }

            return false;
        }

        private void _CheckIn(Client client)
        {
            client.CheckInHistory.Add(
                new ClientCheckIn
                {
                    At = DateTime.Now,
                }
            );
             
            _context.Clients.Update(client);
            _context.SaveChanges();
        }

        public void Create(Client client)
        {
            client.TrainingPlan = null;
            client.CheckInHistory = new List<ClientCheckIn>();
            client.Notifications = new List<ClientNotification>();
            _context.Clients.Add(client);
            _context.SaveChanges();
        }

        public void Update(Client oldClient, Client client)
        {
            oldClient.Id = client.Id;
            oldClient.Nif = client.Nif;
            oldClient.FirstName = client.FirstName;
            oldClient.LastName = client.LastName;
            oldClient.ImageUrl = client.ImageUrl;
            oldClient.BirthDate = client.BirthDate;
            oldClient.Age = client.Age;
            oldClient.HeightInMeters = client.HeightInMeters;
            oldClient.WeightInKg = client.WeightInKg;
            oldClient.TrainingPlanId = client.TrainingPlanId;
            oldClient.CheckInHistory = client.CheckInHistory;
            oldClient.Notifications = client.Notifications;
            oldClient.SupportTickets = client.SupportTickets;

            _context.Clients.Update(oldClient);
            _context.SaveChanges();
        }

        public void Delete(Client client)
        {
            _context.Clients.Remove(client);
            _context.SaveChanges();
        }
    }
}
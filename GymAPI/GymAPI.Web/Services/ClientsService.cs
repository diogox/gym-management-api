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
        void AddNotification(Client client, ClientNotificationDAO notification);
        void MarkNotificationAsRead(ClientNotification notification);
        bool UpdatePlan(Client client, long planId);
        List<SupportTicket> GetClientTickets(Client client);
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

        public void AddNotification(Client client, ClientNotificationDAO notification)
        {
            ClientNotification newNotification = new ClientNotification()
            {
                Timestamp = DateTime.Now,
                Title = notification.Title,
                Message = notification.Message,
                IsUnread = true,
                ClientId = client.Id
                
            };
            client.Notifications.Add(newNotification);
            _context.SaveChanges();
        }

        public void MarkNotificationAsRead(ClientNotification notification)
        {
            notification.IsUnread = false;
            _context.SaveChanges();
        }

        public bool UpdatePlan(Client client, long planId)
        {
            // Check if training plan exists
            if (_context.Plans.Any(plan => plan.Id == planId))
            {
                client.TrainingPlanId = planId;
                
                // Generate Notification
                this.AddNotification(client, new ClientNotificationDAO()
                {
                    Title = "Novo Plano de Treino Atribuído.",
                    Message = "Foi-lhe atribuído um novo plano de treino. Vá a \"Meu Plano\" no seu menu para visualiza-lo."
                });
                
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public List<SupportTicket> GetClientTickets(Client client)
        {
            return _context.SupportTickets.Where(ticket => ticket.ClientId == client.Id).ToList();
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
            oldClient.HeightInMeters = client.HeightInMeters;
            oldClient.WeightInKg = client.WeightInKg;

            _context.Clients.Update(oldClient);
            _context.SaveChanges();
        }

        public void Delete(Client client)
        {
            var user = _context.Users.Single(_user => _user.ClientId == client.Id);
            _context.Users.Remove(user);
            
            _context.Clients.Remove(client);
            _context.SaveChanges();
        }
    }
}
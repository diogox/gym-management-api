using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;

namespace Tests.MockServices
{
    public class MockClientsService : IClientsService
    {
        private readonly List<Client> _clients;

        public MockClientsService()
        {
            _clients = new List<Client>()
            {
                new Client()
                {
                    Id  = 1,
                    Nif = 123456789,
                    FirstName = "Diogo",
                    LastName = "Pinto",
                    ImageUrl = "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-1/c32.9.116.116a/1781933_600863973336621_1986414256_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=2b0a1e27121d53100293cde64a4630d0&oe=5CA09A1A",
                    BirthDate = DateTime.Today,
                    Age = 0,
                    HeightInMeters = 1.80,
                    WeightInKg = 74
                },
                new Client()
                {
                    Id  = 2,
                    Nif = 123456789,
                    FirstName = "Gustavo",
                    LastName = "Oliveira",
                    ImageUrl = "https://scontent.fopo3-2.fna.fbcdn.net/v/t1.0-9/46264329_1076807422496403_1197886436351672320_n.jpg?_nc_cat=102&_nc_ht=scontent.fopo3-2.fna&oh=0ea0f188a804e582bede2c4780ae3a3f&oe=5C9BA1BA",
                    BirthDate = DateTime.Today,
                    Age = 0,
                    HeightInMeters = 1.70,
                    WeightInKg = 64
                },
            };
        }

        public List<Client> GetAll()
        {
            return _clients;
        }

        public Client GetById(long id)
        {
            throw new System.NotImplementedException();
        }

        public bool CheckIn(Client client)
        {
            throw new System.NotImplementedException();
        }

        public void AddNotification(Client client, ClientNotificationDAO notification)
        {
            throw new System.NotImplementedException();
        }

        public void MarkNotificationAsRead(ClientNotification notification)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdatePlan(Client client, long planId)
        {
            throw new System.NotImplementedException();
        }

        public List<SupportTicket> GetClientTickets(Client client)
        {
            throw new System.NotImplementedException();
        }

        public void Create(Client client)
        {
            throw new System.NotImplementedException();
        }

        public void Update(Client oldClient, Client client)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(Client client)
        {
            throw new System.NotImplementedException();
        }
    }
}
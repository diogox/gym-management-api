using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using GymAPI;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Tests.Utils;
using Xunit;

namespace Tests
{
    public class ClientsControllerTests
    {
        private readonly ClientsController _controller;
        private readonly Mock<IClientsService> _clientsService;
        private readonly Client _mockClient;

        public ClientsControllerTests()
        {
            
            // Arrange
            _mockClient = new Client()
            {
                Id = 1,
                FirstName = "Diogo",
                LastName = "Pinto",
                Nif = 123456789,
                Age = 0,
                BirthDate = DateTime.Now,
                ImageUrl =
                    "https://scontent.flis7-1.fna.fbcdn.net/v/t1.0-1/c32.9.116.116a/1781933_600863973336621_1986414256_n.jpg?_nc_cat=102&_nc_ht=scontent.flis7-1.fna&oh=b8d5ac081dcc63506f1a6d8b1945ee7b&oe=5CA09A1A",
                HeightInMeters = 1.8,
                WeightInKg = 74,
                Notifications = new List<ClientNotification>()
                {
                    new ClientNotification()
                    {
                        Id = 1,
                        Title = "Title",
                        Message = "Message",
                        IsUnread = true,
                    }
                }
            };
            
            _clientsService = new Mock<IClientsService>();
            _clientsService.Setup(service => service.Create(_mockClient));
            _clientsService.Setup(service => service.GetById( It.IsAny<long>() )).Returns(_mockClient);
            _clientsService.Setup(service => service.CheckIn( It.IsAny<Client>() )).Returns(true);
            
            var authService = new Mock<IAuthorizationsService>(); // TODO

            /*
            const string ROLENAME = "Admin";

            var userId = Guid.NewGuid().ToString();

            var admin = new User()
            {
                UserName = "admin",
                Email = "admin@qwerty.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                Role = UserRole.Admin,
            };
            */
            
            var mockUserStore = new Mock<IUserStore<User>>();
            var mockUserRoleStore = mockUserStore.As<IUserRoleStore<User>>();
            var userManager =
                new UserManager<User>(mockUserStore.Object, null, null, null, null, null, null, null, null);
            _controller = new ClientsController(_clientsService.Object, userManager, authService.Object);
        }

        [Fact]
        public void TestGetAll()
        {
            // Act
            var result = _controller.GetAllClients();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }
        
        [Fact]
        public void TestGetById()
        {   
            // Act
            var result = _controller.GetClient(1);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            _clientsService.Verify(service => service.GetById(1));
        }
        
        [Fact]
        public void TestClientCheckIn()
        {
            // Act
            var result = _controller.ClientCheckIn(1);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            _clientsService.Verify(service => service.GetById(1));
            _clientsService.Verify(service => service.CheckIn(_mockClient));
        }
        
        [Fact]
        public void TestGetClientNotifications()
        {
            // Act
            var result = _controller.GetClientNotifications(1);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            _clientsService.Verify(service => service.GetById(1));
        } 
    }
}
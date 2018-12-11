using System;
using GymAPI;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Tests.MockServices;
using Xunit;

namespace Tests
{
    public class ClientsControllerTests
    {
        private readonly ClientsController _controller;
        
        public ClientsControllerTests()
        {
            var clientsService = new MockClientsService();

            var userStore = new Mock<IUserStore<User>>(); // TODO: use 'moq' ?
            var userManager = new UserManager(userStore.Object);

            var authService = new MockAuthService(); // TODO
            _controller = new ClientsController(clientsService, userManager, authService);
        }

        [Fact]
        public void TestGetAll()
        {
            // Arrange
            //var controller = new ClientsController();
            
            // Act
            var result = _controller.GetAllClients();
            
            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
    }
}
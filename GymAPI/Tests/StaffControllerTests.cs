using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GymAPI.DAOs;
using GymAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Xunit;

namespace Tests
{
    
    public class StaffControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/staff/";
        private readonly long CLIENT_ID;

        public StaffControllerTests()
        {
            base.LoadUsers();

            var clientId = CreateClient("diogo", "diogo@qwerty.com").Result;
            CLIENT_ID = clientId;
        }

        private async Task<long> CreateClient(string username, string email)
        {
            var client = new SignupClientDAO()
            {
                Username = username,
                Password = "Password123",
                Email = email,
                Nif = 123456789,
                Age = 0,
                BirthDate = DateTime.Now,
                FirstName = "Diogo",
                LastName = "Pinto",
                ImageUrl = "",
                HeightInMeters = 1.8,
                WeightInKg = 70
            };
            var res = await base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(client), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [InlineData("", "")]     // "api/clients"
        [InlineData("", "1")]    // "api/clients/1"
        [Theory]
        public async Task GetWithoutAuth(string endpoint, string id)
        {
            var endpointEnding = "";
            if (id != "")
            {
                endpointEnding = endpoint + "/" + id;
            }
            else
            {
                endpointEnding = endpoint;
            }            
            
            // Should return 401 - Unauthorized
            var response = await base.NoAuth.GetAsync(API_ENDPOINT + endpoint);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetClients()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<Client>>(stringResponse);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<Client> GetClient()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< Client >(stringResponse);
            Assert.Equal(CLIENT_ID, result.Id);

            return result;
        }

        [Fact]
        public async Task ClientCheckIn()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID + "/check-in");
            response.EnsureSuccessStatusCode();

            // Should have a new check-in
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< Client >(stringResponse);
            Assert.Equal(1, result.CheckInHistory.Count);
        }

        [Fact]
        public async Task GetClientNotification()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID + "/notifications");
            response.EnsureSuccessStatusCode();

            // Should have a new check-in
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< List<ClientNotification> >(stringResponse);
            Assert.IsType< List<ClientNotification> >(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task MarkClientNotificationAsRead()
        {   
            // Add Notification
            var notificationId = await PostClientNotification();
            
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID + "/notifications/" + notificationId + "/read");
            response.EnsureSuccessStatusCode();

            // Should have a new check-in
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< ClientNotification >(stringResponse);
            Assert.Equal(false, result.IsUnread);
        }

        [Fact]
        public async Task<long> PostClientNotification()
        {
            var notification = new ClientNotificationDAO()
            {
                Title = "Notification Title",
                Message = "Notification Message"
            };
            var response = await base.Admin.PostAsync(API_ENDPOINT + CLIENT_ID + "/notifications", new StringContent(JsonConvert.SerializeObject(notification), Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
            var notificationRes = await response.Content.ReadAsStringAsync();
            var notificationResObj = JsonConvert.DeserializeObject<ClientNotification>(notificationRes);

            return notificationResObj.Id;
        }
        
        [Fact]
        public async Task GetClientTickets()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID + "/tickets");
            response.EnsureSuccessStatusCode();

            // Should have a new check-in
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< List<SupportTicket> >(stringResponse);
            Assert.IsType< List<SupportTicket> >(result);
            Assert.Empty(result);
        }
        
        [Fact]
        public async Task PostClientTrainingPlan()
        {   
            // Change plan
            var notification = new SwitchPlanDAO()
            {
                PlanId = 0
            };
            var response = await base.Admin.PostAsync(API_ENDPOINT + CLIENT_ID + "/plan", new StringContent(JsonConvert.SerializeObject(notification), Encoding.UTF8, "application/json"));
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
        
        [Fact]
        public async Task PutClient()
        {   
            // Get current client
            var client = await GetClient();
            
            // Update Client
            var newClient = client;
            newClient.Age = 2;
            var response = await base.Admin.PutAsync(API_ENDPOINT + CLIENT_ID, new StringContent(JsonConvert.SerializeObject(newClient), Encoding.UTF8, "application/json"));
            
            // Get Client again
            newClient = await GetClient();
            
            // Assert
            Assert.Equal(newClient.Age, client.Age);
        }
        
        [Fact]
        public async Task DeleteClient()
        {   
            // Create new client
            var clientId = await CreateClient("pedro", "pedro@qwerty.com");
            
            // Delete client
            var response = await base.Admin.DeleteAsync(API_ENDPOINT + clientId);
            response.EnsureSuccessStatusCode();
            
            // Assert
            response = await base.Admin.GetAsync(API_ENDPOINT + clientId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
    
}
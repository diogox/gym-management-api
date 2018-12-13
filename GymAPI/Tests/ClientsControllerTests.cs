using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using GymAPI.DAOs;
using GymAPI.Models;
using Newtonsoft.Json;
using Xunit;

namespace Tests
{
    
    public class ClientsControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/clients/";
        private readonly long CLIENT_ID;

        public ClientsControllerTests()
        {
            base.LoadUsers();

            var client = new SignupClientDAO()
            {
                Username = "diogo",
                Password = "Password123",
                Email = "diogo@qwerty.com",
                Nif = 123456789,
                Age = 0,
                BirthDate = DateTime.Now,
                FirstName = "Diogo",
                LastName = "Pinto",
                ImageUrl = "",
                HeightInMeters = 1.8,
                WeightInKg = 70
            };
            var res = base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(client), Encoding.UTF8, "application/json"));
            res.Wait();

            var clientRes = res.Result.Headers.Location;
            CLIENT_ID = 1;
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
        public async Task GetClient()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + CLIENT_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< Client >(stringResponse);
            Assert.Equal(CLIENT_ID, result.Id);
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
    }
    
}
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using GymAPI.Models;
using Newtonsoft.Json;
using Xunit;

namespace Tests
{
    
    public class ClientsControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/clients/";

        public ClientsControllerTests()
        {
            base.LoadUsers();
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
            Assert.Empty(result);
        }
    }
    
}
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
        private readonly HttpClient _client;
        private readonly HttpClient _clientAdmin;

        public ClientsControllerTests()
        {
            _client = base.GetHttpClient();
            _clientAdmin = base.GetHttpClientWithAuthAdmin();
        }

        [Fact]
        public async Task GetClientsUnauthorized()
        {
            // Should return 401 - Unauthorized
            var response = await _client.GetAsync(API_ENDPOINT);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetClients()
        {   
            // Should return 200 - Successful
            var response = await _clientAdmin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<Client>>(stringResponse);
            Assert.Empty(result);
    
        }
    }
    
}
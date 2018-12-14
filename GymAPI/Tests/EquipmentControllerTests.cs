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
    
    public class EquipmentControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/equipment/";
        private readonly long EQUIPMENT_ID;

        public EquipmentControllerTests()
        {
            base.LoadUsers();
            EQUIPMENT_ID = PostEquipment().Result;
        }
        
        [Fact]
        public async Task<long> PostEquipment()
        {
            var equipment = new Equipment()
            {
                Name = "",
                Description = "",
                Quantity = 12,
                ImageUrl = "",
                BrandName = "",
                SupplierName = "",
                PriceInEuro = 12,
            };
            var res = await base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(equipment), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [InlineData("", "")]     // "api/equipment"
        [InlineData("", "1")]    // "api/equipment/1"
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
        public async Task GetAllEquipment()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< List<Equipment> >(stringResponse);
            Assert.IsType< List<Equipment> >(result);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<Equipment> GetEquipment()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + EQUIPMENT_ID);
            response.EnsureSuccessStatusCode();

            // Assert
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< Equipment >(stringResponse);
            Assert.IsType< Equipment >(result);
            Assert.Equal(result.Id, EQUIPMENT_ID);

            return result;
        }

        [Fact]
        public async Task PutEquipment()
        {   
            // Get current client
            var equipment = await GetEquipment();
            
            // Update Client
            var newEquipment = equipment;
            newEquipment.Quantity = 2;
            var response = await base.Admin.PutAsync(API_ENDPOINT + EQUIPMENT_ID, new StringContent(JsonConvert.SerializeObject(newEquipment), Encoding.UTF8, "application/json"));
            
            // Get Client again
            newEquipment = await GetEquipment();
            
            // Assert
            Assert.Equal(newEquipment.Quantity, equipment.Quantity);
        }
        
        [Fact]
        public async Task DeleteEquipment()
        {   
            // Create new client
            var equipmentId = await PostEquipment();
            
            // Delete client
            var response = await base.Admin.DeleteAsync(API_ENDPOINT + equipmentId);
            response.EnsureSuccessStatusCode();
            
            // Assert
            response = await base.Admin.GetAsync(API_ENDPOINT + equipmentId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
    
}
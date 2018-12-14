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
        private readonly long STAFF_MEMBER_ID;

        public StaffControllerTests()
        {
            base.LoadUsers();

            var memberId = CreateStaffMember("diogo", "diogo@qwerty.com").Result;
            STAFF_MEMBER_ID = memberId;
        }

        private async Task<long> CreateStaffMember(string username, string email)
        {
            var member = new SignupStaffMemberDAO()
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
                Rank = StaffMemberRank.Trainer,
                Salary = 400,
                HasBeenPaidThisMonth = false
            };
            var res = await base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(member), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [InlineData("", "")]     // "api/staff"
        [InlineData("", "1")]    // "api/staff/1"
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
        public async Task GetStaff()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<StaffMember>>(stringResponse);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<StaffMember> GetStaffMember()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + STAFF_MEMBER_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< StaffMember >(stringResponse);
            Assert.Equal(STAFF_MEMBER_ID, result.Id);

            return result;
        }
        
        [Fact]
        public async Task GetTrainers()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + "trainers/");
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<StaffMember>>(stringResponse);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<StaffMember> GetTrainer()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + "trainers/" + STAFF_MEMBER_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< StaffMember >(stringResponse);
            Assert.Equal(STAFF_MEMBER_ID, result.Id);

            return result;
        }
        
        [Fact]
        public async Task PutStaffMember()
        {   
            // Get current client
            var member = await GetStaffMember();
            
            // Update Client
            var newMember = member;
            newMember.Age = 2;
            var response = await base.Admin.PutAsync(API_ENDPOINT + STAFF_MEMBER_ID, new StringContent(JsonConvert.SerializeObject(newMember), Encoding.UTF8, "application/json"));
            
            // Get Client again
            newMember = await GetStaffMember();
            
            // Assert
            Assert.Equal(newMember.Age, member.Age);
        }
        
        [Fact]
        public async Task DeleteClient()
        {   
            // Create new client
            var memberId = await CreateStaffMember("pedro", "pedro@qwerty.com");
            
            // Delete client
            var response = await base.Admin.DeleteAsync(API_ENDPOINT + memberId);
            response.EnsureSuccessStatusCode();
            
            // Assert
            response = await base.Admin.GetAsync(API_ENDPOINT + memberId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
    
}
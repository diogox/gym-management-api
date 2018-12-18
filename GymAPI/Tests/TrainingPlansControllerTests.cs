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
    
    public class TrainingPlansControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/plans/";
        private readonly long TRAINER_ID;
        private readonly long PLAN_ID;

        public TrainingPlansControllerTests()
        {
            base.LoadUsers();

            TRAINER_ID = CreateStaffMember("trainer", "trainer@qwerty.com").Result;
            PLAN_ID = PostPlan().Result;
        }
        
        private async Task<long> CreateStaffMember(string username, string email)
        {
            var member = new SignupStaffMemberDAO()
            {
                Username = username,
                Password = "Password123",
                Email = email,
                Nif = 123456789,
                BirthDate = DateTime.Now,
                FirstName = "Diogo",
                LastName = "Pinto",
                ImageUrl = "",
                Rank = StaffMemberRank.Trainer,
                Salary = 400,
                HasBeenPaidThisMonth = false
            };
            var res = await base.Admin.PostAsync("/api/staff/", new StringContent(JsonConvert.SerializeObject(member), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [Fact]
        public async Task<long> PostPlan()
        {
            var plan = new TrainingPlan()
            {
                Name = "",
                SupervisingTrainerId = TRAINER_ID,
                ExerciseBlocks = new List<TrainingPlanBlock>()
            };
            var res = await base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(plan), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [InlineData("", "")]     // "api/plans"
        [InlineData("", "1")]    // "api/plans/1"
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
        public async Task GetPlans()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<TrainingPlan>>(stringResponse);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<TrainingPlan> GetPlan()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + PLAN_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< TrainingPlan >(stringResponse);
            Assert.Equal(PLAN_ID, result.Id);

            return result;
        }
        
        [Fact]
        public async Task PutPlan()
        {   
            // Get current client
            var plan = await GetPlan();
            
            // Update Client
            var newPlan = plan;
            newPlan.Name = "Test";
            var response = await base.Admin.PutAsync(API_ENDPOINT + PLAN_ID, new StringContent(JsonConvert.SerializeObject(newPlan), Encoding.UTF8, "application/json"));
            response.EnsureSuccessStatusCode();
            
            // Get Client again
            newPlan = await GetPlan();
            
            // Assert
            Assert.Equal("Test", newPlan.Name);
        }
        
        [Fact]
        public async Task DeletePlan()
        {   
            // Create new plan
            var planId = await PostPlan();
            
            // Delete plan
            var response = await base.Admin.DeleteAsync(API_ENDPOINT + planId);
            response.EnsureSuccessStatusCode();
            
            // Assert
            response = await base.Admin.GetAsync(API_ENDPOINT + planId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
    
}
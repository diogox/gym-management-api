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
    
    public class ExercisesControllerTests : ControllerTestBase
    {
        private readonly string API_ENDPOINT = "/api/exercises/";
        private readonly long EXERCISE_ID;

        public ExercisesControllerTests()
        {
            base.LoadUsers();

            var exerciseId = PostExercise().Result;
            EXERCISE_ID = exerciseId;
        }

        [Fact]
        public async Task<long> PostExercise()
        {
            var exercise = new Exercise()
            {
                Name = "",
                Description = "",
                DifficultyLevel = DifficultyLevels.Easy,
                TargetMuscleGroup = MuscleGroups.Abs,
                ImageUrl = "",
                EquipmentId = null,
            };
            var res = await base.Admin.PostAsync(API_ENDPOINT, new StringContent(JsonConvert.SerializeObject(exercise), Encoding.UTF8, "application/json"));
            return Convert.ToInt64( res.Headers.Location.Segments.Last() );
        }

        [InlineData("", "")]     // "api/exercises"
        [InlineData("", "1")]    // "api/exercises/1"
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
        public async Task GetExercises()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<List<Exercise>>(stringResponse);
            Assert.NotEmpty(result);
        }

        [Fact]
        public async Task<Exercise> GetExercise()
        {   
            // Should return 200 - Successful
            var response = await base.Admin.GetAsync(API_ENDPOINT + EXERCISE_ID);
            response.EnsureSuccessStatusCode();

            // Should return an empty list
            var stringResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject< Exercise >(stringResponse);
            Assert.Equal(EXERCISE_ID, result.Id);

            return result;
        }
        
        [Fact]
        public async Task PutExercise()
        {   
            // Get current exercise
            var exercise = await GetExercise();
            
            // Update exercise
            var newExercise = exercise;
            newExercise.DifficultyLevel = DifficultyLevels.Hard;
            var response = await base.Admin.PutAsync(API_ENDPOINT + EXERCISE_ID, new StringContent(JsonConvert.SerializeObject(newExercise), Encoding.UTF8, "application/json"));
            
            // Get exercise again
            newExercise = await GetExercise();
            
            // Assert
            Assert.Equal(DifficultyLevels.Hard, newExercise.DifficultyLevel);
        }
        
        [Fact]
        public async Task DeleteExercise()
        {   
            // Create new exercise
            var exerciseId = await PostExercise();
            
            // Delete exercise
            var response = await base.Admin.DeleteAsync(API_ENDPOINT + exerciseId );
            response.EnsureSuccessStatusCode();
            
            // Assert
            response = await base.Admin.GetAsync(API_ENDPOINT + exerciseId );
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
    
}
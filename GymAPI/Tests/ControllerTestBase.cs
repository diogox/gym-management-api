using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using GymAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;

namespace Tests
{
    public class ControllerTestBase
    {

        protected HttpClient GetHttpClient()
        {
            var builder = new WebHostBuilder()
                .UseStartup<TestStartup>();
            var server = new TestServer(builder);
            var client = server.CreateClient();

            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            
            return client;
        }
        
        protected HttpClient GetHttpClientWithAuthAdmin()
        {
            var client = GetHttpClient();
            var response = client.PostAsync("/api/auth/login/", new StringContent(" { 'username': 'admin', 'password': 'Password123' } ", Encoding.UTF8, "application/json"));
            response.Wait();

            var authTokenObj = response.Result.Content.ReadAsStringAsync();
            authTokenObj.Wait();

            var authToken = JsonConvert.DeserializeObject<BearerToken>(authTokenObj.Result);
            
            client.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse("bearer " + authToken.Token);
            return client;
        }

        private class BearerToken
        {
            public string Token { get; set; }
        }
    }
}
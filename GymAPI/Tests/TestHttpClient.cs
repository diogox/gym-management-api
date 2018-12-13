using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using GymAPI;
using GymAPI.DAOs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;

namespace Tests
{
    public class ControllerTestBase
    {
        public HttpClient NoAuth { get; set; }
        public HttpClient Admin { get; set; }
        public HttpClient Client1 { get; set; }
        public HttpClient Client2 { get; set; }
        public HttpClient StaffMember { get; set; }
        public HttpClient Trainer { get; set; }

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
        
        protected HttpClient GetHttpClientWithAuth(string username, string password)
        {
            var client = GetHttpClient();
            var response = client.PostAsync("/api/auth/login/", new StringContent(" { 'username': '" + username + "', 'password': '" + password + "' } ", Encoding.UTF8, "application/json"));
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

        protected void LoadUsers()
        {   
            var httpClient = GetHttpClient();
            NoAuth = httpClient;
            Admin = GetHttpClientWithAuth("admin", "Password123");
        }
    }
}
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using GymAPI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

namespace Tests
{
    public class ControllerTestBase
    {

        protected HttpClient GetHttpClient()
        {
            var builder = new WebHostBuilder()
                .UseStartup<Startup>();
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

            var authToken = response.Result.Content.ReadAsStringAsync();
            authToken.Wait();
            client.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse("bearer " + authToken.Result);
            return client;
        } 
    }
}
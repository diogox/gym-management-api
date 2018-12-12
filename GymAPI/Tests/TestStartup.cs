using GymAPI;
using GymAPI.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Tests
{
    public class TestStartup : Startup
    {
        public TestStartup(IConfiguration configuration) : base(configuration)
        {
            
        }

        public override void SetUpDataBase(IServiceCollection services)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder
            {
                DataSource = ":memory:"
            };
            var connectionString = connectionStringBuilder.ToString();
            var connection = new SqliteConnection(connectionString);
            services
                .AddEntityFrameworkSqlite()
                .AddDbContext<GymContext>(options => options.UseSqlite(connection));
        }

        public override void EnsureDatabaseCreated(GymContext dbContext)
        {
            dbContext.Database.OpenConnection();
            dbContext.Database.EnsureCreated();
        }
    }
}
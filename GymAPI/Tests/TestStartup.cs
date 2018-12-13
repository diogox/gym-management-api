using System;
using System.Threading.Tasks;
using GymAPI;
using GymAPI.Models;
using GymAPI.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
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

            //SeedDatabase(dbContext);
        }

        private void SeedDatabase(GymContext context)
        {
            
            // Add Clients
            var client1 = new Client()
            {
                Id = 1,
                Nif = 123456789,
                FirstName = "Diogo",
                LastName = "Pinto",
                ImageUrl = "",
                BirthDate = DateTime.Now,
                Age = 0,
                HeightInMeters = 1.8,
                WeightInKg = 74,
            };
            
            var client2 = new Client()
            {
                Id = 2,
                Nif = 987654321,
                FirstName = "Pedro",
                LastName = "Pinheiro",
                ImageUrl = "",
                BirthDate = DateTime.Now,
                Age = 0,
                HeightInMeters = 1.6,
                WeightInKg = 63,
            };
            
            context.Clients.Add(client1);
            context.Clients.Add(client2);
            
            // Add Staff Members
            var staffMember = new StaffMember()
            {
                Id = 1,
                Rank = StaffMemberRank.Receptionist,
                Nif = 134263548,
                FirstName = "Paulo",
                LastName = "Coelho",
                BirthDate = DateTime.Now,
                Age = 0,
                ImageUrl = "",
                Salary = 500,
                HasBeenPaidThisMonth = true,
            };
            var trainer = new StaffMember()
            {
                Id = 2,
                Rank = StaffMemberRank.Trainer,
                Nif = 134263548,
                FirstName = "Ricardo",
                LastName = "Fernandes",
                BirthDate = DateTime.Now,
                Age = 0,
                ImageUrl = "",
                Salary = 530,
                HasBeenPaidThisMonth = true,
            };

            context.Staff.Add(staffMember);
            context.Staff.Add(trainer);

            AddUsers( context.GetService<IServiceProvider>() ).Wait();
        }

        private async Task AddUsers(IServiceProvider services)
        {
            var userManager = services.GetRequiredService<UserManager<User>>();
            
            // Create Client Users
            var userClient1 = new User()
            {
                UserName = "diogo",
                Email = "diogo@qwerty.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                Role = UserRole.Client,
                ClientId = 1,
            };
            await userManager.CreateAsync(userClient1, "Password123");
            await userManager.AddToRoleAsync(userClient1, "Client");
            
            var userClient2 = new User()
            {
                UserName = "pedro",
                Email = "diogo@qwerty.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                Role = UserRole.Client,
                ClientId = 2,
            };
            await userManager.CreateAsync(userClient2, "Password123");
            await userManager.AddToRoleAsync(userClient2, "Client");
            
            // Create Staff Member User
            var userStaff = new User()
            {
                UserName = "paulo",
                Email = "paulo@qwerty.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                Role = UserRole.Staff,
                StaffMemberId = 1,
            };
            await userManager.CreateAsync(userStaff, "Password123");
            await userManager.AddToRoleAsync(userStaff, "Staff");
            
            // Create Trainer User
            var userTrainer = new User()
            {
                UserName = "ricardo",
                Email = "ricardo@qwerty.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                Role = UserRole.Trainer,
                StaffMemberId = 2,
            };
            await userManager.CreateAsync(userTrainer, "Password123");
            await userManager.AddToRoleAsync(userTrainer, "Trainer");
        }
    }
}
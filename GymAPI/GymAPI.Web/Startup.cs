using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GymAPI.CustomPolicies;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace GymAPI
{
    public class Startup
    {
        public virtual void SetUpDataBase(IServiceCollection services)
        {
            var connection = "Data Source=gym.db";
            services.AddDbContext<GymContext>
                (options => options.UseSqlite(connection));
        }
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(options =>
                {
                    // Makes the enum fields show up as text instead of integers
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                    
                    // Makes the fields with null values not show up in the JSON
                    //options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
                });

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Info
                {
                    Title = "Gym API",
                    Description = "A REST API for Gym Management."
                });
            });
            
            SetUpDataBase(services);
            
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<GymContext>()
                .AddDefaultTokenProviders();
            
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                
                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;
                options.Lockout.AllowedForNewUsers = true;
  
                // User settings
                options.User.RequireUniqueEmail = true; 
            });

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer((options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidAudience = "https://gym-lds.herokuapp.com/",
                        ValidIssuer = "https://gym-lds.herokuapp.com/",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsASuperSecurePassword"))
                    };
                }));
            
            // Add authorize globally
            services.AddMvc(o =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                o.Filters.Add(new AuthorizeFilter(policy));
            });
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy("PreventOtherClients",
                    policy => policy.Requirements.Add( new SameUserTypeRequirement("Client", new List<string>()
                    {
                        "Admin",
                        "Staff",
                        "Trainer"
                    })) 
                );
                
                options.AddPolicy("SameStaffMemberOnly&AllowAdmin",
                    policy => policy.Requirements.Add( new SameUserTypeRequirement("StaffMember", new List<string>()
                    {
                        "Admin"
                    })) 
                );
            });
            services.AddTransient<IAuthorizationHandler, SameUserTypeHandler>();
            
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IClientsService, ClientsService>();
            services.AddScoped<IEquipmentService, EquipmentService>();
            services.AddScoped<IExercisesService, ExercisesService>();
            services.AddScoped<ITrainingPlansService, TrainingPlansService>();
            services.AddScoped<ITrainingPlanBlocksService, TrainingPlanBlocksService>();
            services.AddScoped<IStaffService, StaffService>();
            services.AddScoped<ITrainersStaffService, TrainersStaffService>();
            services.AddScoped<ISupportTicketsService, SupportTicketsService>();
            services.AddScoped<IAuthorizationsService, AuthorizationsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider services)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            
            app.UseHttpsRedirection();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .WithHeaders("content-type", "authorization")
                .WithMethods("GET", "POST", "PUT", "DELETE")
            );

            app.UseAuthentication();
            
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Gym API");
            });

            //CreateUserRoles(services).Wait();
        }
        
        
        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
  
            IdentityResult roleResult;
            //Adding Admin Role
            var roleCheck = await roleManager.RoleExistsAsync("Admin");
            User user;
            if (!roleCheck)
            {
                //create the roles and seed them to the database
                roleResult = await roleManager.CreateAsync(new IdentityRole("Admin"));
                
                user = new User()
                {
                    UserName = "admin",
                    Email = "admin@qwerty.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    Role = UserRole.Admin
                };
                
                await userManager.CreateAsync(user, "Password123");
                await userManager.AddToRoleAsync(user, "Admin");
            }
            
            // creating Creating Client role     
            roleCheck = await roleManager.RoleExistsAsync("Client");
            if (!roleCheck)
            {
                var role = new IdentityRole();
                role.Name = "Client";
                await roleManager.CreateAsync(role);
            }

            // creating Creating Staff role     
            roleCheck = await roleManager.RoleExistsAsync("Staff");
            if (!roleCheck)
            {
                var role = new IdentityRole();
                role.Name = "Staff";
                await roleManager.CreateAsync(role);
            }
            
            // creating Creating Trainer role     
            roleCheck = await roleManager.RoleExistsAsync("Trainer");
            if (!roleCheck)
            {
                var role = new IdentityRole();
                role.Name = "Trainer";
                await roleManager.CreateAsync(role);
            }
        }

    }
}

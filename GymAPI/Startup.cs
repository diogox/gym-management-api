using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.Swagger;

namespace GymAPI
{
    public class Startup
    {
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
            
            var connection = "Data Source=gym.db";
            services.AddDbContext<GymContext>
                (options => options.UseSqlite(connection));
            
            services.AddScoped<IClientsService, ClientsService>();
            services.AddScoped<IEquipmentService, EquipmentService>();
            services.AddScoped<IExercisesService, ExercisesService>();
            services.AddScoped<ITrainingPlansService, TrainingPlansService>();
            services.AddScoped<ITrainingPlanBlocksService, TrainingPlanBlocksService>();
            services.AddScoped<IStaffService, StaffService>();
            services.AddScoped<ITrainersStaffService, TrainersStaffService>();
            services.AddScoped<ISupportTicketsService, SupportTicketsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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
                .WithHeaders("content-type")
                .WithMethods("GET", "POST", "PUT", "DELETE")
            );
            app.UseMvc();

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Gym API");
            });
        }
    }
}

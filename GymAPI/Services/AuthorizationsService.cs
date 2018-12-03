using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GymAPI.Models;
using GymAPI.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface IAuthorizationsService
    {
        bool CheckIfAdmin(ClaimsPrincipal context);
        bool CheckIfTrainer(ClaimsPrincipal context);
        bool CheckIfStaff(ClaimsPrincipal context);
        bool CheckIfClient(ClaimsPrincipal context);
        Task<bool> CheckIfCurrentClient(HttpContext context, long requestedId);
        Task<bool> CheckIfCurrentStaffMember(HttpContext context, long requestedId);
        Task<bool> CheckIfCurrentClientHasTrainingPlan(HttpContext context, long requestedId);
    }
    
    public class AuthorizationsService : IAuthorizationsService
    {
        private readonly UserManager<User> _userManager;
        private readonly IClientsService _clientsService;

        public AuthorizationsService(UserManager<User> userManager, IClientsService clientsService)
        {
            _userManager = userManager;
            _clientsService = clientsService;
        }

        public bool CheckIfAdmin(ClaimsPrincipal context)
        {
            return context.IsInRole("Admin");
        }

        public bool CheckIfTrainer(ClaimsPrincipal context)
        {
            return context.IsInRole("Trainer");
        }

        public bool CheckIfStaff(ClaimsPrincipal context)
        {
            return context.IsInRole("Staff");
        }

        public bool CheckIfClient(ClaimsPrincipal context)
        {
            return context.IsInRole("Client");
        }

        public async Task<bool> CheckIfCurrentClient(HttpContext context, long requestedId)
        {
            var isClient = context.User.IsInRole("Client");
            if (!isClient)
            {
                return false;
            }
            
            var username = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (username != null)
            {
                var user = await _userManager.FindByNameAsync(username);
                if (user.ClientId != requestedId)
                {
                    return false;
                }   
            }
            else
            {
                return false;
            }

            return true;
        }

        public async Task<bool> CheckIfCurrentClientHasTrainingPlan(HttpContext context, long requestedPlanId)
        {
            var isClient = context.User.IsInRole("Client");
            if (!isClient)
            {
                return false;
            }
            
            var username = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (username != null)
            {
                var user = await _userManager.FindByNameAsync(username);
                if (user != null)
                {
                    var client = _clientsService.GetById(user.ClientId.Value);
                    if (client.TrainingPlanId != requestedPlanId)
                    {
                        return false;
                    }   
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }

            return true;
        }
        
        public async Task<bool> CheckIfCurrentStaffMember(HttpContext context, long requestedId)
        {
            var isStaffMember = context.User.IsInRole("Staff") || context.User.IsInRole("Trainer");
            if (!isStaffMember)
            {
                return false;
            }
            
            var username = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            if (username != null)
            {
                var user = await _userManager.FindByNameAsync(username);
                if (user.StaffMemberId != requestedId)
                {
                    return false;
                }   
            }
            else
            {
                return false;
            }

            return true;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using GymAPI.Models;
using GymAPI.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;

namespace GymAPI.CustomPolicies
{
    public class SameUserTypeHandler : AuthorizationHandler<SameUserTypeRequirement>
    {
        private readonly UserManager<User> _userManager;
        
        public SameUserTypeHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserTypeRequirement requirement)
        {

            var isRoleToAllow = CheckIfAllowRole(context.User, requirement.RoleNamesToAllowDespiteRequirement);
            if (isRoleToAllow)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            
            if (context.Resource is AuthorizationFilterContext mvcContext)
            {
                var requestedUserTypeId = Convert.ToInt64(mvcContext.RouteData.Values["id"]);
                var requestingUserId = mvcContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
                Task<User> user = _userManager.FindByNameAsync(requestingUserId);
                
                user.Wait();
                
                // Check the correct field for each type
                var userType = requirement.UserType;
                if (userType == "Client")
                {
                    if (requestedUserTypeId == user.Result.ClientId)
                    {
                        context.Succeed(requirement);
                    }
                } else if (userType == "StaffMember")
                {
                    if (requestedUserTypeId == user.Result.StaffMemberId)
                    {
                        context.Succeed(requirement);
                    }
                }
                else
                {
                    throw new Exception("Wrong user type passed into the configurations!");
                }
            }

            return Task.CompletedTask;
        }
        
        private bool CheckIfAllowRole(ClaimsPrincipal userClaims, List<string> roles)
        {
            foreach (var role in roles)
            {
                if ( userClaims.IsInRole(role) )
                {
                    return true;
                }
            }
            
            return false;
        }
    }
}
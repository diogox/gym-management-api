using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace GymAPI.CustomPolicies
{
    public class SameUserTypeRequirement : IAuthorizationRequirement
    {
        public string UserType { get; set; }
        public List<string> RoleNamesToAllowDespiteRequirement { get; set; }

        public SameUserTypeRequirement(string userType, List<string> roleNames)
        {
            UserType = userType;
            RoleNamesToAllowDespiteRequirement = roleNames;
        }
 
    }
}
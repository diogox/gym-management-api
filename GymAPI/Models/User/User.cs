using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace GymAPI.Models.User
{
    public class User : IdentityUser
    {
        public UserRole Role { get; set; }
        
        [JsonIgnore]
        public StaffMember StaffMember { get; set; }
        public long? StaffMemberId { get; set; }    
        
        [JsonIgnore]
        public Client Client { get; set; }
        public long? ClientId { get; set; }
    }
}
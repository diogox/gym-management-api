using System;

namespace GymAPI.Models
{
    public class StaffMember
    {
        public long Id { get; set; }
        public long Nif { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BirthDate { get; set; }
        public StaffMemberRank Rank { get; set; }
        public float Salary { get; set; }
        public bool HasBeenPaidThisMonth { get; set; }
    }
}
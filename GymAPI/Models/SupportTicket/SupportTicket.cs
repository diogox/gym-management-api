using System.ComponentModel.DataAnnotations;

namespace GymAPI.Models
{
    public class SupportTicket
    {
        public long Id { get; set; }
        
        [Required]
        public string Message { get; set; }
        
        [Required]
        public long ClientId { get; set; }
        public Client Client { get; set; }
    }
}
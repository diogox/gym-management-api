using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class SupportTicket
    {
        public long Id { get; set; }
        public List<SupportTicketMessage> Messages { get; set; } = new List<SupportTicketMessage>();
        public DateTime OpenedAt { get; set; }
        public TicketState State { get; set; }
        
        [Required]
        public long ClientId { get; set; }
        [JsonIgnore]
        public Client Client { get; set; }
    }
}
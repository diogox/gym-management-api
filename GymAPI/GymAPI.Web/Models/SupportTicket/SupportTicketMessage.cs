using System;
using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class SupportTicketMessage
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public DateTime At { get; set; }
        public long FromClientId { get; set; }
        public long FromStaffId { get; set; }
        
        [JsonIgnore]
        public SupportTicket SupportTicket { get; set; }
        public long SupportTicketId { get; set; }
        
        public SupportTicketMessageSender From { get; set; }
    }
}
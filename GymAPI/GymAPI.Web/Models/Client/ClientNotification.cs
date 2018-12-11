using System;
using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class ClientNotification
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsUnread { get; set; }
        
        [JsonIgnore]
        public Client Client { get; set; }
        public long ClientId { get; set; }
    }
}
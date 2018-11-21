using System;

namespace GymAPI.Models
{
    public class ClientNotification
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
        public bool IsUnread { get; set; }
    }
}
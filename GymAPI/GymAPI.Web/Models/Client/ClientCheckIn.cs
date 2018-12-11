using System;
using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class ClientCheckIn
    {
        public long Id { get; set; }
        public DateTime At { get; set; }
        
        [JsonIgnore]
        public Client Client { get; set; }
        public long ClientId { get; set; }
    }
}
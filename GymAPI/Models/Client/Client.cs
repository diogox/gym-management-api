using System;
using System.Collections.Generic;

namespace GymAPI.Models
{
    public class Client
    {
        public long Id { get; set; }
        public long Nif { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public float HeightInMeters { get; set; }
        public float WeightInKg { get; set; }
        public TrainingPlan TrainingPlan { get; set; }

        /// <summary>
        /// Contains a list of times and dates the client checked-in at the gym.
        /// </summary>
        public List<ClientCheckIn> CheckInHistory { get; set; } = new List<ClientCheckIn>();

        /// <summary>
        /// Contains a list of notifications for the user.
        /// </summary>
        public List<ClientNotification> Notifications { get; set; } = new List<ClientNotification>();
    }
}
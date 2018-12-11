using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class TrainingPlanBlock
    {
        [JsonIgnore]
        public TrainingPlan Plan { get; set; }
        public long PlanId { get; set; }
        
        [JsonIgnore]
        public Exercise Exercise { get; set; }
        public long ExerciseId { get; set; }
        public int NumberOfRepetitions { get; set; }
        public int NumberOfSeries { get; set; }
        public DayOfTheWeek DayOfTheWeek { get; set; }
    }
}
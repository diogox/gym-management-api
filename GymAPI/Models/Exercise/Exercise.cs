using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace GymAPI.Models
{
    public class Exercise
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        [Required]
        public MuscleGroups TargetMuscleGroup { get; set; }
        
        [Required]
        public DifficultyLevels DifficultyLevel { get; set; }
        
        [JsonIgnore]
        public Equipment Equipment { get; set; }
        public long? EquipmentId { get; set; }
        //public List<TrainingPlanBlock> UsedByPlans { get; set; } = new List<TrainingPlanBlock>();
    }
}
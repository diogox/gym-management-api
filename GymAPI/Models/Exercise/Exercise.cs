using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        public List<Equipment> EquipmentToUse { get; set; } = new List<Equipment>();
        //public List<TrainingPlanBlock> UsedByPlans { get; set; } = new List<TrainingPlanBlock>();
    }
}
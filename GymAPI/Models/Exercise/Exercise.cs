using System.Collections.Generic;

namespace GymAPI.Models
{
    public class Exercise
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public MuscleGroups TargetMuscleGroup { get; set; }
        public DifficultyLevels DifficultyLevel { get; set; }
        public List<Equipment> EquipmentToUse { get; set; } = new List<Equipment>();
    }
}
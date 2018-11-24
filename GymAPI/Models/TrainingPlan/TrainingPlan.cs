using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GymAPI.Models
{
    public class TrainingPlan
    {
        public long Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        public List<TrainingPlanBlock> ExerciseBlocks { get; set; } = new List<TrainingPlanBlock>();
        
        [Required]
        public long SupervisingTrainerId { get; set; }
        public StaffMember SupervisingTrainer { get; set; }
    }
}
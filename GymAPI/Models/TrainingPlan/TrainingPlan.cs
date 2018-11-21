using System;
using System.Collections.Generic;

namespace GymAPI.Models
{
    public class TrainingPlan
    {
        public long Id { get; set; }
        public List<Exercise> MondayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> TuesdayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> WednesdayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> ThursdayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> FridayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> SaturdayExercises { get; set; } = new List<Exercise>();
        public List<Exercise> SundayExercises { get; set; } = new List<Exercise>();
        
        //public Staff SupervisingTrainer { get; set; }
    }
}
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface IExercisesService
    {
        List<Exercise> GetAll();
        Exercise GetById(int id);
        void Create(Exercise exercise);
        void Update(Exercise oldExercise, Exercise exercise);
        void Delete(Exercise exercise);
    }
    
    public class ExercisesService : IExercisesService
    {
        private readonly GymContext _context;

        public ExercisesService(GymContext context)
        {
            _context = context;
            _context.Exercises.Add(new Exercise
            {
                Description = "O exercício abdominal é um dos mais conhecidos exercícios para desenvolvimento e fortalecimento da musculatura abdominal, principalmente do músculo reto abdominal. É também um modelo pertencente ao método Hiit, que dentro deste, pode sofrer muitas variações, de acordo com a necessidade do praticante.",
                Name = "Abdominais",
                DifficultyLevel = DifficultyLevels.Easy,
                ImageUrl = "https://images.fitpregnancy.mdpcdn.com/sites/fitpregnancy.com/files/styles/width_360/public/field/image/young-woman-abdominal-exercise_700x700.jpg",
                TargetMuscleGroup = MuscleGroups.Abs,
            });
            _context.SaveChanges();
        }


        public List<Exercise> GetAll()
        {
            return _context.Exercises.ToList();
        }

        public Exercise GetById(int id)
        {
            return _IncludeAllInfo()
                .SingleOrDefault(exercise => exercise.Id == id);
        }

        private IQueryable<Exercise> _IncludeAllInfo()
        {
            return _context.Exercises
                .Include(client => client.EquipmentToUse);
        }
        
        public void Create(Exercise exercise)
        {
            _context.Exercises.Add(exercise);
            _context.SaveChanges();
        }

        public void Update(Exercise oldExercise, Exercise exercise)
        {
            oldExercise.Id = exercise.Id;
            oldExercise.Name = exercise.Name;
            oldExercise.Description = exercise.Description;
            oldExercise.ImageUrl = exercise.ImageUrl;
            oldExercise.TargetMuscleGroup = exercise.TargetMuscleGroup;
            oldExercise.DifficultyLevel = exercise.DifficultyLevel;
            oldExercise.EquipmentToUse = exercise.EquipmentToUse;

            _context.Exercises.Update(oldExercise);
            _context.SaveChanges();
        }

        public void Delete(Exercise exercise)
        {
            _context.Exercises.Remove(exercise);
            _context.SaveChanges();
        }
    }
}
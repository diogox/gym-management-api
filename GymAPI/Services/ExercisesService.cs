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
            _context.Equipment.AttachRange(exercise.EquipmentToUse);
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
            //oldExercise.UsedByPlans = exercise.UsedByPlans;

            _context.SaveChanges();
        }

        public void Delete(Exercise exercise)
        {
            _context.Exercises.Remove(exercise);
            _context.SaveChanges();
        }
    }
}
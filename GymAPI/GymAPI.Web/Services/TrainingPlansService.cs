using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface ITrainingPlansService
    {
        List<TrainingPlan> GetAll();
        TrainingPlan GetById(long id);
        List<Exercise> GetExercises(TrainingPlan plan);
        Exercise AddExerciseToPlan(TrainingPlan plan, TrainingPlanBlock block);
        void Create(TrainingPlan plan);
        void Update(TrainingPlan oldPlan, TrainingPlan plan);
        void Delete(TrainingPlan plan);
    }
    
    public class TrainingPlansService : ITrainingPlansService
    {
        private readonly GymContext _context;

        public TrainingPlansService(GymContext context)
        {
            _context = context;
        }


        public List<TrainingPlan> GetAll()
        {
            return _IncludeAllInfo().ToList();
        }

        public TrainingPlan GetById(long id)
        {
            return _IncludeAllInfo().Single(plan => plan.Id == id);
        }

        public List<Exercise> GetExercises(TrainingPlan plan)
        {
            return _context.Exercises.Where(
                exercise => plan.ExerciseBlocks.Exists(block => block.ExerciseId == exercise.Id)
            ).ToList();
        }

        public Exercise AddExerciseToPlan(TrainingPlan plan, TrainingPlanBlock block)
        {
            block.PlanId = plan.Id;
            plan.ExerciseBlocks.Add(block);
            
            _context.SaveChanges();
            return _context.Exercises.SingleOrDefault(exercise => exercise.Id == block.ExerciseId);
        }
        
        private IQueryable<TrainingPlan> _IncludeAllInfo()
        {
            return _context.Plans
                .Include(plan => plan.SupervisingTrainer)
                .Include(plan => plan.ExerciseBlocks);
        }

        public void Create(TrainingPlan plan)
        {
            plan.SupervisingTrainer = null; // SupervisingTrainerId initializes this field
            _context.Plans.Add(plan);
            _context.SaveChanges();
        }

        public void Update(TrainingPlan oldPlan, TrainingPlan plan)
        {
            oldPlan.Name = plan.Name;
            oldPlan.ExerciseBlocks = plan.ExerciseBlocks;
            oldPlan.SupervisingTrainerId = plan.SupervisingTrainerId;
            
            _context.SaveChanges();
        }

        public void Delete(TrainingPlan plan)
        {
            _context.Plans.Remove(plan);
            _context.SaveChanges();
        }
    }
}
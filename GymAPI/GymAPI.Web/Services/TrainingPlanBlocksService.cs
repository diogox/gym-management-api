using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface ITrainingPlanBlocksService
    {
        List<TrainingPlanBlock> GetAll(TrainingPlan plan);
        TrainingPlanBlock AddExerciseToPlan(TrainingPlan plan, TrainingPlanBlock block);
        void Delete(TrainingPlan plan, TrainingPlanBlock block);
    }
    
    public class TrainingPlanBlocksService : ITrainingPlanBlocksService
    {
        private readonly GymContext _context;

        public TrainingPlanBlocksService(GymContext context)
        {
            _context = context;
        }


        public List<TrainingPlanBlock> GetAll(TrainingPlan plan)
        {
            return plan.ExerciseBlocks.ToList();
        }

        public TrainingPlanBlock AddExerciseToPlan(TrainingPlan plan, TrainingPlanBlock block)
        {
            block.PlanId = plan.Id;
            plan.ExerciseBlocks.Add(block);
            
            _context.SaveChanges();
            return block;
        }

        public void Delete(TrainingPlan plan, TrainingPlanBlock block)
        {
            plan.ExerciseBlocks.Remove(block);
            _context.SaveChanges();
        }
    }
}
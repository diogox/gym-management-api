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
        
        private IQueryable<TrainingPlan> _IncludeAllInfo()
        {
            return _context.Plans
                .Include(client => client.MondayExercises)
                .Include(client => client.TuesdayExercises)
                .Include(client => client.WednesdayExercises)
                .Include(client => client.ThursdayExercises)
                .Include(client => client.FridayExercises)
                .Include(client => client.SaturdayExercises)
                .Include(client => client.SundayExercises)
                .Include(client => client.SupervisingTrainer);
        }

        public void Create(TrainingPlan plan)
        {
            _context.Plans.Add(plan);
            _context.SaveChanges();
        }

        public void Update(TrainingPlan oldPlan, TrainingPlan plan)
        {
            oldPlan.Id = plan.Id;
            oldPlan.MondayExercises = plan.MondayExercises;
            oldPlan.TuesdayExercises = plan.TuesdayExercises;
            oldPlan.WednesdayExercises= plan.WednesdayExercises;
            oldPlan.ThursdayExercises= plan.ThursdayExercises;
            oldPlan.FridayExercises = plan.FridayExercises;
            oldPlan.SaturdayExercises = plan.SaturdayExercises;
            oldPlan.SundayExercises = plan.SundayExercises;
            oldPlan.SupervisingTrainer = plan.SupervisingTrainer;

            _context.Plans.Update(oldPlan);
            _context.SaveChanges();
        }

        public void Delete(TrainingPlan plan)
        {
            _context.Plans.Remove(plan);
            _context.SaveChanges();
        }
    }
}
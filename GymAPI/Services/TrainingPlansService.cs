using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface ITrainingPlansService
    {
        List<TrainingPlan> GetAll();
        TrainingPlan GetById(int id);
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

            _context.Plans.Add(new TrainingPlan
            {
                MondayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    }
                },
                TuesdayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    }
                },
                WednesdayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    },
                },
                ThursdayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    },
                },
                FridayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    },
                },
                SaturdayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    },
                },
                SundayExercises = new List<Exercise>
                {
                    new Exercise
                    {
                        Description = "O exercício consiste em fazer o máximo de repetições possivel.",
                        Name = "Abdominais",
                        DifficultyLevel = DifficultyLevels.Easy,
                        ImageUrl = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjT_87z6-reAhVGQRoKHbh_AhwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3O3qQUkGluE&psig=AOvVaw3ikUApMbJe0VL-gKBvASin&ust=1543073771942809",
                        EquipmentToUse = new List<Equipment>(),
                        TargetMuscleGroup = MuscleGroups.Abs,
                    },
                },
                SupervisingTrainer = new StaffMember()
                {
                    Rank = StaffMemberRank.Trainer
                }
            });
            _context.SaveChanges();
        }


        public List<TrainingPlan> GetAll()
        {
            return _IncludeAllInfo().ToList();
        }

        public TrainingPlan GetById(int id)
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
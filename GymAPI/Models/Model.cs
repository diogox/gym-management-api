using Microsoft.EntityFrameworkCore;

namespace GymAPI.Models
{
    public class GymContext: DbContext
    {
        public GymContext(DbContextOptions<GymContext> options)
            : base(options)
        {}
        
        public DbSet<Client> Clients { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<TrainingPlan> Plans { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<StaffMember> Staff { get; set; }
        public DbSet<SupportTicket> SupportTickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TrainingPlanBlock>()
                .HasKey(tpb => new
                {
                    tpb.PlanId,
                    tpb.ExerciseId,
                    tpb.DayOfTheWeek,
                    tpb.NumberOfRepetitions,
                    tpb.NumberOfSeries,
                });
        }
    }
}
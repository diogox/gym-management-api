using Microsoft.EntityFrameworkCore;

namespace GymAPI.Models
{
    public class GymContext: DbContext
    {
        public GymContext(DbContextOptions<GymContext> options)
            : base(options)
        { }
        
        public DbSet<Client> Clients { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
    }
}
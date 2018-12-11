using System.ComponentModel.DataAnnotations;

namespace GymAPI.DAOs
{
    public class SwitchPlanDAO
    {
        [Required]
        public long PlanId { get; set; }
    }
}
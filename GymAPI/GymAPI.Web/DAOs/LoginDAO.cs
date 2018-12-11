using System.ComponentModel.DataAnnotations;

namespace GymAPI.DAOs
{
    public class LoginDAO
    {
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }
    }
}
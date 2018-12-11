using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using GymAPI.Models;
namespace GymAPI.DAOs
{
    public class SignupClientDAO
    {
        [Required(ErrorMessage = "Email is required!")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Username is required!")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Password is required!")]
        public string Password { get; set; }
        
        public long Nif { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BirthDate { get; set; }
        public int Age { get; set; }
        public double HeightInMeters { get; set; }
        public float WeightInKg { get; set; }
    }
}
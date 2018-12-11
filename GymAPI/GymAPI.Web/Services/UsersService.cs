using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using GymAPI.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GymAPI.Services
{
    public interface IUsersService
    {
        List<User> GetAll();
        User GetById(string id);
        void Create(User user);
        void Update(User oldUser, User user);
        void Delete(User user);
    }
    
    public class UsersService : IUsersService
    {
        private readonly GymContext _context;
        private readonly UserManager<User> _userManager;

        public UsersService(GymContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetById(string id)
        {
            return _context.Users
                .SingleOrDefault(user => user.Id == id);
        }
        
        public async void Create(User user)
        {
            if (user.Role == UserRole.Client)
            {
                await _userManager.AddToRoleAsync(user, "Client");
            } else if (user.Role == UserRole.Staff)
            {
                await _userManager.AddToRoleAsync(user, "Staff");
            } else if (user.Role == UserRole.Trainer)
            {
                await _userManager.AddToRoleAsync(user, "Trainer");
            }
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Update(User oldUser, User user)
        {
            oldUser.Id = user.Id;
            _context.SaveChanges();
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}
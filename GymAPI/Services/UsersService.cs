using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using GymAPI.Models.User;
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

        public UsersService(GymContext context)
        {
            _context = context;
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
        
        public void Create(User user)
        {
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
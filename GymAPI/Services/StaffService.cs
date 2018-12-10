using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;
using GymAPI.Models.User;
using Microsoft.AspNetCore.Identity;

namespace GymAPI.Services
{
    
    public interface IStaffService
    {
        List<StaffMember> GetAll();
        StaffMember GetById(long id);
        void Create(StaffMember member);
        void Update(StaffMember oldMember, StaffMember member);
        void Delete(StaffMember member);
    }
    
    public class StaffService : IStaffService
    {
        private readonly GymContext _context;
        private readonly UserManager<User> _userManager;

        public StaffService(GymContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        
        public List<StaffMember> GetAll()
        {
            return _context.Staff.ToList();
        }

        public StaffMember GetById(long id)
        {
            return _context.Staff.Find(id);
        }

        public void Create(StaffMember member)
        {
            
            _context.Staff.Add(member);
            _context.SaveChanges();
        }

        public void Update(StaffMember oldMember, StaffMember member)
        {
            oldMember.Id = member.Id;
            oldMember.Nif = member.Nif;
            oldMember.Email = member.Email;
            oldMember.FirstName = member.FirstName;
            oldMember.LastName = member.LastName;
            oldMember.ImageUrl = member.ImageUrl;
            oldMember.Age = member.Age;
            oldMember.BirthDate = member.BirthDate;
            oldMember.Salary = member.Salary;
            oldMember.HasBeenPaidThisMonth = member.HasBeenPaidThisMonth;

            _context.Staff.Update(oldMember);
            _context.SaveChanges();
        }

        public void Delete(StaffMember member)
        {
            var user = _context.Users.Single(_user => _user.StaffMemberId == member.Id);
            _context.Users.Remove(user);
            
            _context.Staff.Remove(member);
            _context.SaveChanges();
        }
    }
}
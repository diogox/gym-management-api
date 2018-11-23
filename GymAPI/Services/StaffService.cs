using System;
using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;

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

        public StaffService(GymContext context)
        {
            _context = context;
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
            oldMember.Rank = member.Rank;
            oldMember.Salary = member.Salary;
            oldMember.HasBeenPaidThisMonth = member.HasBeenPaidThisMonth;

            _context.Staff.Update(oldMember);
            _context.SaveChanges();
        }

        public void Delete(StaffMember member)
        {
            _context.Staff.Remove(member);
            _context.SaveChanges();
        }
    }
}
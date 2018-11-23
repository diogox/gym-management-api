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

            _context.Staff.Add(new StaffMember
            {
                FirstName = "Gustavo",
                LastName = "Oliveira",
                Age = 0,
                BirthDate = DateTime.Now,
                Email = "gustavinho19@gmail.com",
                Nif = 122423423,
                Rank = StaffMemberRank.Trainer,
                HasBeenPaidThisMonth = false,
                Salary = (float) 100.50,
                ImageUrl = "https://scontent.flis7-1.fna.fbcdn.net/v/t1.0-9/16387190_703190483191434_8195178389931928488_n.jpg?_nc_cat=101&_nc_ht=scontent.flis7-1.fna&oh=40f37c49e42e023b8b6fec681274e20e&oe=5CAB61CA"
            });
            _context.SaveChanges();
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
            _context.Add(member);
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
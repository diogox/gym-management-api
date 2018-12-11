using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using GymAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI.Services
{
    
    public interface ITrainersStaffService
    {
        List<StaffMember> GetAll();
        StaffMember GetById(long id);
    }
    
    public class TrainersStaffService : ITrainersStaffService
    {
        private readonly GymContext _context;

        public TrainersStaffService(GymContext context)
        {
            _context = context;
        }
        
        public List<StaffMember> GetAll()
        {
            return _context.Staff
                .Where(member => member.Rank == StaffMemberRank.Trainer)
                .ToList();
        }

        public StaffMember GetById(long id)
        {
            var member = _context.Staff.Find(id);

            return member?.Rank != StaffMemberRank.Trainer ? null : member;
        }
    }
}
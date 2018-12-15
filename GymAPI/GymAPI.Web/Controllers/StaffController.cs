using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GymAPI.DAOs;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;
        private readonly UserManager<User> _userManager;
        private readonly ITrainersStaffService _trainersStaffService;

        public StaffController(IStaffService staffService, ITrainersStaffService trainersStaffService, UserManager<User> userManager)
        {
            _userManager = userManager;
            _staffService = staffService;
            _trainersStaffService = trainersStaffService;
        }

        // GET api/staff
        [HttpGet]
        [Authorize(Roles = "Admin")] 
        public ActionResult<List<StaffMember>> GetStaff()
        {
            return Ok(_staffService.GetAll());
        }

        // GET api/staff/{id}
        [HttpGet("{id}", Name = "GetStaffMember")]
        [Authorize(Policy = "SameStaffMemberOnly&AllowAdmin")]
        public ActionResult<string> GetStaffMember(long id)
        {
            var member = _staffService.GetById(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }
        
        // POST api/staff
        [HttpPost]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult> SignupUser([FromBody] SignupStaffMemberDAO signupInfo)
        {
            // Check username overlap
            var user = await _userManager.FindByNameAsync(signupInfo.Username);
            if (user != null)
            {
                return BadRequest("Username already exists!");
            }
            
            // Check email overlap
            user = await _userManager.FindByEmailAsync(signupInfo.Email);
            if (user != null)
            {
                return BadRequest("Email already exists!");
            }
                
            // Create staff member
            var member = new StaffMember()
            {
                Nif = signupInfo.Nif,
                FirstName = signupInfo.FirstName,
                LastName = signupInfo.LastName,
                Email = signupInfo.Email,
                ImageUrl = signupInfo.ImageUrl,
                BirthDate = signupInfo.BirthDate,
                Age = signupInfo.Age,
                Rank = signupInfo.Rank,
                Salary = signupInfo.Salary,
                HasBeenPaidThisMonth = signupInfo.HasBeenPaidThisMonth,
            };
            _staffService.Create(member);
            
            // Create staff member
            User newUser = new User()
            {
                UserName = signupInfo.Username,
                Email = signupInfo.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                StaffMemberId = member.Id,
            };
            var result = await _userManager.CreateAsync(newUser, signupInfo.Password);
            
            if (!result.Succeeded)
            {
                _staffService.Delete(member);
                return BadRequest("Failed to create staff member! Probably a password validation error!");
            }
            
            if (member.Rank == StaffMemberRank.Trainer)
            {
                await _userManager.AddToRoleAsync(newUser, "Trainer");
            } else
            {
                await _userManager.AddToRoleAsync(newUser, "Staff");
            }
            
            return CreatedAtRoute("GetStaffMember", new { id = member.Id}, member);
        }

        // PUT api/staff/{id}
        [HttpPut("{id}")]
        [Authorize(Policy = "SameStaffMemberOnly&AllowAdmin")]
        public ActionResult UpdateStaffMember(long id, [FromBody] StaffMember member)
        {
            var oldMember = _staffService.GetById(id);
            if (oldMember == null)
            {
                return NotFound();
            }
            
            _staffService.Update(oldMember, member);
            return NoContent();
        }

        // DELETE api/staff/{id}
        [HttpDelete("{id}")]
        [Authorize(Policy = "SameStaffMemberOnly&AllowAdmin")]
        public ActionResult DeleteStaffMember(long id)
        {
            var member = _staffService.GetById(id);
            if (member == null)
            {
                return NotFound();
            }
            
            _staffService.Delete(member);
            return NoContent();
        }
        
        // GET api/staff/trainers
        [HttpGet("trainers")]
        [Authorize(Roles = "Admin")] 
        public ActionResult<string> GetAllTrainers()
        {
            return Ok(_trainersStaffService.GetAll());
        }
        
        // GET api/staff/trainers/{id}
        [HttpGet("trainers/{id}")]
        [Authorize(Policy = "SameStaffMemberOnly&AllowAdmin")]
        public ActionResult<string> GetTrainer(long id)
        {
            var trainer = _trainersStaffService.GetById(id);
            if (trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);
        }
    }
}

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
    [Authorize(Roles = "Admin")] 
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;
        private readonly UserManager<User> _userManager;
        private readonly ITrainersStaffService _trainersStaffService;
        private readonly IAuthorizationsService _authService;

        public StaffController(IStaffService staffService, ITrainersStaffService trainersStaffService, UserManager<User> userManager, IAuthorizationsService authService)
        {
            _userManager = userManager;
            _staffService = staffService;
            _trainersStaffService = trainersStaffService;
            _authService = authService;
        }

        // GET api/staff
        [HttpGet]
        public ActionResult<List<StaffMember>> GetStaff()
        {
            return Ok(_staffService.GetAll());
        }

        // GET api/staff/{id}
        [HttpGet("{id}", Name = "GetStaffMember")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> GetStaffMember(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);

            if ( !_isAdmin )
            {
                if (! await _authService.CheckIfCurrentStaffMember(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var member = _staffService.GetById(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }
        
        // POST api/staff
        [HttpPost]
        public async Task<ActionResult> SignupUser([FromBody] SignupStaffMemberDAO signupInfo)
        {
            // Check username overlap
            var user = await _userManager.FindByNameAsync(signupInfo.Username);
            if (user != null)
            {
                return BadRequest("Username already exists!");
            }
                
            // Create client
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
            
            // Create user
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
        [AllowAnonymous]
        public async Task<ActionResult> UpdateStaffMember(long id, [FromBody] StaffMember member)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);

            if ( !_isAdmin )
            {
                if (! await _authService.CheckIfCurrentStaffMember(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
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
        [AllowAnonymous]
        public async Task<ActionResult> DeleteStaffMember(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);

            if ( !_isAdmin )
            {
                if (! await _authService.CheckIfCurrentStaffMember(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
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
        public ActionResult<string> GetAllTrainers()
        {
            return Ok(_trainersStaffService.GetAll());
        }
        
        // GET api/staff/trainers/{id}
        [HttpGet("trainers/{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> GetTrainer(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);

            if ( !_isAdmin )
            {
                if (! await _authService.CheckIfCurrentStaffMember(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var trainer = _trainersStaffService.GetById(id);
            if (trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);
        }
    }
}

using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;
        private readonly ITrainersStaffService _trainersStaffService;

        public StaffController(IStaffService staffService, ITrainersStaffService trainersStaffService)
        {
            _staffService = staffService;
            _trainersStaffService = trainersStaffService;
        }

        // GET api/staff
        [HttpGet]
        public ActionResult<List<StaffMember>> GetStaff()
        {
            return Ok(_staffService.GetAll());
        }

        // GET api/staff/{id}
        [HttpGet("{id}", Name = "GetStaffMember")]
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
        public ActionResult RegisterStaffMember([FromBody] StaffMember member)
        {
            _staffService.Create(member);
            
            return CreatedAtRoute("GetStaffMember", new { id = member.Id}, member);
        }

        // PUT api/staff/{id}
        [HttpPut("{id}")]
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
        public ActionResult<string> GetAllTrainers()
        {
            return Ok(_trainersStaffService.GetAll());
        }
        
        // GET api/staff/trainers/{id}
        [HttpGet("trainers/{id}")]
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

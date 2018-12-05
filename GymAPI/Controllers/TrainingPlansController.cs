using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/plans")]
    [ApiController]
    [Authorize(Roles = "Admin, Trainer")] 
    public class TrainingPlansController : Controller
    {
        private readonly ITrainingPlansService _trainingPlansService;
        private readonly ITrainingPlanBlocksService _blocksService;
        private readonly IAuthorizationsService _authService;

        public TrainingPlansController(ITrainingPlansService trainingPlansService,
            ITrainingPlanBlocksService blocksService,
            IAuthorizationsService authService)
        {
            _trainingPlansService = trainingPlansService;
            _blocksService = blocksService;
            _authService = authService;
        }

        // GET api/plans
        [HttpGet]
        public ActionResult<List<TrainingPlan>> GetAllTrainingPlans()
        {
            return Ok(_trainingPlansService.GetAll());
        }

        // GET api/plans/{id}
        [HttpGet("{id}", Name = "GetTrainingPlan")]
        [AllowAnonymous]
        public async Task<ActionResult<TrainingPlan>> GetTrainingPlan(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (! await _authService.CheckIfCurrentClientHasTrainingPlan(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }
            return Ok(plan);
        }
        
        // GET api/plans/{id}/exercises
        [HttpGet("{id}/exercises")]
        public async Task<ActionResult<List<TrainingPlanBlock>>> GetTrainingPlanExerciseBlocks(long id)
        {
            var _isAdmin = _authService.CheckIfAdmin(User);
            var _isStaff = _authService.CheckIfStaff(User);
            var _isTrainer = _authService.CheckIfTrainer(User);

            if ( !(_isAdmin || _isStaff || _isTrainer) )
            {
                if (! await _authService.CheckIfCurrentClientHasTrainingPlan(HttpContext, id))
                {
                    return Forbid();
                }
            }
            
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }

            var blocks = _blocksService.GetAll(plan);
            return Ok(blocks);
        }

        // POST api/plans
        [HttpPost]
        public ActionResult CreateTrainingPlan([FromBody] TrainingPlan plan)
        {
            _trainingPlansService.Create(plan);
            
            return CreatedAtRoute("GetTrainingPlan", new { id = plan.Id}, plan);
        }
        
        // POST api/plans/{id}/exercises
        [HttpPost("{id}/exercises")]
        public ActionResult AddExercise(long id, [FromBody] TrainingPlanBlock block)
        {
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }
            
            var submittedBlock = _blocksService.AddExerciseToPlan(plan, block);
            return Ok(submittedBlock);
        }

        // PUT api/plans/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTrainingPlan(long id, [FromBody] TrainingPlan plan)
        {
            var oldPlan= _trainingPlansService.GetById(id);
            if (oldPlan== null)
            {
                return NotFound();
            }
            
            _trainingPlansService.Update(oldPlan, plan);
            return NoContent();
        }
        
        // DELETE api/plans/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTrainingPlan(long id)
        {
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }
            
            _trainingPlansService.Delete(plan);
            return NoContent();
        }
        
        // DELETE api/plans/{id}/exercises
        [HttpDelete("{id}/exercises/{exerciseId}")]
        public ActionResult DeleteExercise(long id, [FromBody] TrainingPlanBlock block)
        {
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }

            block.PlanId = id;
            _blocksService.Delete(plan, block);
            return NoContent();
        }
    }
}
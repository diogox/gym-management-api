using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/plans")]
    [ApiController]
    public class TrainingPlansController : Controller
    {
        private readonly ITrainingPlansService _trainingPlansService;
        private readonly ITrainingPlanBlocksService _blocksService;

        public TrainingPlansController(ITrainingPlansService trainingPlansService,
            ITrainingPlanBlocksService blocksService)
        {
            _trainingPlansService = trainingPlansService;
            _blocksService = blocksService;
        }

        // GET api/plans
        [HttpGet]
        public ActionResult<List<TrainingPlan>> GetAllTrainingPlans()
        {
            return Ok(_trainingPlansService.GetAll());
        }

        // GET api/plans/{id}
        [HttpGet("{id}", Name = "GetTrainingPlan")]
        public ActionResult<TrainingPlan> GetTrainingPlan(long id)
        {
            var plan = _trainingPlansService.GetById(id);
            if (plan == null)
            {
                return NotFound();
            }
            return Ok(plan);
        }
        
        // GET api/plans/{id}/exercises
        [HttpGet("{id}/exercises")]
        public ActionResult<List<TrainingPlanBlock>> GetTrainingPlanExerciseBlocks(long id)
        {
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
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

        public TrainingPlansController(ITrainingPlansService trainingPlansService)
        {
            _trainingPlansService = trainingPlansService;
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

        // POST api/plans
        [HttpPost]
        public ActionResult CreateTrainingPlan([FromBody] TrainingPlan plan)
        {
            _trainingPlansService.Create(plan);
            
            return CreatedAtRoute("GetTrainingPlan", new { id = plan.Id}, plan);
        }

        // PUT api/plans/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTrainingPlan(long id,[FromBody] TrainingPlan plan)
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
    }
}
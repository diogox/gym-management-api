using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : Controller
    {
        private readonly IExercisesService _exercisesService;

        public ExercisesController(IExercisesService exercisesService)
        {
            _exercisesService = exercisesService;
        }

        // GET api/exercises
        [HttpGet]
        [Authorize]
        public ActionResult<List<Exercise>> GetAllExercises()
        {
            return Ok(_exercisesService.GetAll());
        }

        // GET api/exercises/5
        [HttpGet("{id}", Name = "GetExercise")]
        [Authorize]
        public ActionResult<Exercise> GetExercise(int id)
        {
            var exercise = _exercisesService.GetById(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return Ok(exercise);
        }

        // POST api/exercises
        [HttpPost]
        [Authorize(Roles = "Admin, Trainer")]
        public ActionResult CreateExercise([FromBody] Exercise exercise)
        {
            _exercisesService.Create(exercise);
            
            return CreatedAtRoute("GetExercise", new { id = exercise.Id}, exercise);
        }

        // PUT api/exercises/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Trainer")]
        public ActionResult UpdateExercise(int id,[FromBody] Exercise exercise)
        {
            var oldExercise= _exercisesService.GetById(id);
            if (oldExercise == null)
            {
                return NotFound();
            }
            
            _exercisesService.Update(oldExercise, exercise);
            return NoContent();
        }

        // DELETE api/exercises/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Trainer")]
        public ActionResult DeleteExercise(int id)
        {
            var exercise = _exercisesService.GetById(id);
            if (exercise == null)
            {
                return NotFound();
            }
            
            _exercisesService.Delete(exercise);
            return NoContent();
        }
    }
}
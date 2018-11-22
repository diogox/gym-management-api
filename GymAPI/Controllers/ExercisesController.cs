using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Services;
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
        public ActionResult<List<Exercise>> GetAllExercises()
        {
            return Ok(_exercisesService.GetAll());
        }

        // GET api/exercises/5
        [HttpGet("{id}", Name = "GetExercise")]
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
        public ActionResult CreateExercise([FromBody] Exercise exercise)
        {
            _exercisesService.Create(exercise);
            
            return CreatedAtRoute("GetExercise", new { id = exercise.Id}, exercise);
        }

        // PUT api/exercises/5
        [HttpPut("{id}")]
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
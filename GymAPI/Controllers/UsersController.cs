using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        // GET api/users
        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            return Ok(_usersService.GetAll());
        }

        // GET api/users/{id}
        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<User> GetUser(string id)
        {
            var user = _usersService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        
        // POST api/users
        [HttpPost]
        public ActionResult RegisterUser([FromBody] User user)
        {
            _usersService.Create(user);
            
            return CreatedAtRoute("GetUser", new { id = user.Id}, user);
        }

        // PUT api/users/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateUser(string id,[FromBody] User user)
        {
            var oldUser= _usersService.GetById(id);
            if (oldUser== null)
            {
                return NotFound();
            }
            
            _usersService.Update(oldUser, user);
            return NoContent();
        }

        // DELETE api/users/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteUser(string id)
        {
            var user = _usersService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            
            _usersService.Delete(user);
            return NoContent();
        }
    }
}
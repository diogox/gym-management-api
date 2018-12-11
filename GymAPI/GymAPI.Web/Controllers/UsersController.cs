using System;
using System.Collections.Generic;
using GymAPI.Models;
using GymAPI.Models.User;
using GymAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GymAPI
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")] 
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
    }
}
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
    public class EquipmentController : Controller
    {
        private readonly IEquipmentService _equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        // GET api/equipment
        [HttpGet]
        [Authorize]
        public ActionResult<List<Equipment>> GetAllEquipment()
        {
            return Ok(_equipmentService.GetAll());
        }

        // GET api/equipment/{id}
        [HttpGet("{id}", Name = "GetEquipment")]
        [Authorize]
        public ActionResult<Equipment> GetEquipment(long id)
        {
            var equipment = _equipmentService.GetById(id);
            if (equipment == null)
            {
                return NotFound();
            }
            return Ok(equipment);
        }

        // POST api/equipment
        [HttpPost]
        [Authorize(Roles = "Admin, Trainer, Staff")]
        public ActionResult RegisterEquipment([FromBody] Equipment equipment)
        {
            _equipmentService.Create(equipment);
            
            return CreatedAtRoute("GetEquipment", new { id = equipment.Id }, equipment);
        }

        // PUT api/equipment/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Trainer, Staff")]
        public ActionResult UpdateEquipment(int id,[FromBody] Equipment equipment)
        {
            var oldEquipment = _equipmentService.GetById(id);
            if (oldEquipment == null)
            {
                return NotFound();
            }
            
            _equipmentService.Update(oldEquipment, equipment);
            return NoContent();
        }

        // DELETE api/equipment/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Trainer, Staff")]
        public ActionResult DeleteEquipment(int id)
        {
            var equipment = _equipmentService.GetById(id);
            if (equipment == null)
            {
                return NotFound();
            }
            
            _equipmentService.Delete(equipment);
            return NoContent();
        }
    }
}
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
    [Authorize(Roles = "Admin, Trainer")]
    public class EquipmentController : Controller
    {
        private readonly IEquipmentService _equipmentService;

        public EquipmentController(IEquipmentService equipmentService)
        {
            _equipmentService = equipmentService;
        }

        // GET api/equipment
        [HttpGet]
        public ActionResult<List<Equipment>> GetAllEquipment()
        {
            return Ok(_equipmentService.GetAll());
        }

        // GET api/equipment/{id}
        [HttpGet("{id}", Name = "GetEquipment")]
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
        public ActionResult RegisterEquipment([FromBody] Equipment equipment)
        {
            _equipmentService.Create(equipment);
            
            return CreatedAtRoute("GetEquipment", new { id = equipment.Id }, equipment);
        }

        // PUT api/equipment/{id}
        [HttpPut("{id}")]
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
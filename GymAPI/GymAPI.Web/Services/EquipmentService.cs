using System.Collections.Generic;
using System.Linq;
using GymAPI.Models;

namespace GymAPI.Services
{
    public interface IEquipmentService
    {
        List<Equipment> GetAll();
        Equipment GetById(long id);
        void Create(Equipment equipment);
        void Update(Equipment oldEquipment, Equipment equipment);
        void Delete(Equipment equipment);
    }
    
    public class EquipmentService : IEquipmentService
    {
        private readonly GymContext _context;

        public EquipmentService(GymContext context)
        {
            _context = context;
        }


        public List<Equipment> GetAll()
        {
            return _context.Equipment.ToList();
        }

        public Equipment GetById(long id)
        {
            return _context.Equipment.Find(id);
        }
        
        public void Create(Equipment equipment)
        {
            _context.Equipment.Add(equipment);
            _context.SaveChanges();
        }

        public void Update(Equipment oldEquipment, Equipment equipment)
        {
            oldEquipment.Id = equipment.Id;
            oldEquipment.Name = equipment.Name;
            oldEquipment.BrandName = equipment.BrandName;
            oldEquipment.ImageUrl = equipment.ImageUrl;
            oldEquipment.Quantity= equipment.Quantity;
            oldEquipment.PriceInEuro= equipment.PriceInEuro;
            oldEquipment.SupplierName = equipment.SupplierName;
            oldEquipment.Description = equipment.Description;

            _context.Equipment.Update(oldEquipment);
            _context.SaveChanges();
        }

        public void Delete(Equipment equipment)
        {
            _context.Equipment.Remove(equipment);
            _context.SaveChanges();
        }
    }
}
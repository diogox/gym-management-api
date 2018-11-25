using System;
using System.ComponentModel.DataAnnotations;

namespace GymAPI.Models
{
    public class Equipment
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }
        public float PriceInEuro { get; set; }
        public string SupplierName { get; set; }
        public string Description { get; set; }
    }
}
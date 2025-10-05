using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class MenuItem
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Category { get; set; } // Breakfast, Main, Dessert
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}

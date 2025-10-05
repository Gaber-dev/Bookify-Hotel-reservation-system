using System;

namespace Hotel_management_system.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }
        public DateTime ServedAt { get; set; }
        public int Quantity { get; set; }

        public MenuItem MenuItem { get; set; }
    }
}

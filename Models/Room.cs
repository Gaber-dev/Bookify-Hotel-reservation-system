using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string RoomNumber { get; set; }

        [Required]
        public string Type { get; set; } // Single, Double, Suite

        public decimal PricePerNight { get; set; }

        public bool IsAvailable { get; set; } = true;

        public string Status { get; set; } = "Clean"; // Clean, Dirty, Maintenance

        public ICollection<Booking> Bookings { get; set; }
    }
}

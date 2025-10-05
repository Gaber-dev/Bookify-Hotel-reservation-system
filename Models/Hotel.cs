using System;
using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class Hotel
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        public string City { get; set; }
        public int NumberOfRooms { get; set; }
        public bool HasPool { get; set; }
        public bool HasGym { get; set; }
        public bool HasKidsArea { get; set; }
        public bool HasParking { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

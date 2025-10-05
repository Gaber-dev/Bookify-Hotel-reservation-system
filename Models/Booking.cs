using System;
using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        public int GuestId { get; set; }
        public int RoomId { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [DataType(DataType.Date)]
        public DateTime CheckOut { get; set; }

        public decimal TotalCost { get; set; }

        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled, Completed

        public Guest Guest { get; set; }
        public Room Room { get; set; }
    }
}

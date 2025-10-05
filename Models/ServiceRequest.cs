using System;

namespace Hotel_management_system.Models
{
    public class ServiceRequest
    {
        public int Id { get; set; }
        public int? BookingId { get; set; }   // can be null for walk-in guest service
        public int? GuestId { get; set; }
        public string RequestType { get; set; } // RoomService, Maintenance, Housekeeping
        public string Description { get; set; }
        public DateTime RequestDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending"; // Pending, Dispatched, Completed

        public Guest Guest { get; set; }
    }
}

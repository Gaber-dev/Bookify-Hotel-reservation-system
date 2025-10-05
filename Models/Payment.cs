using System;

namespace Hotel_management_system.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public string Method { get; set; } // Card, Cash, Online
        public string Status { get; set; } = "Paid";

        public Booking Booking { get; set; }
    }
}

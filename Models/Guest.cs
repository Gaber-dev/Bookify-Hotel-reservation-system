using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class Guest
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public ICollection<Booking> Bookings { get; set; }
        public ICollection<ServiceRequest> ServiceRequests { get; set; }
    }
}

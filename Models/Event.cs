using System;
using System.ComponentModel.DataAnnotations;

namespace Hotel_management_system.Models
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } // e.g., Smith Wedding

        public string Type { get; set; } // Wedding, Conference, Group

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int OrganizerId { get; set; } // Guest or Contact person
        public int NumberOfGuests { get; set; }
        public string Location { get; set; } // Hall/Area

        public Guest Organizer { get; set; }
    }
}

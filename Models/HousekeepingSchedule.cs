using System;

namespace Hotel_management_system.Models
{
    public class HousekeepingSchedule
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public DateTime ScheduledAt { get; set; }
        public string Status { get; set; } = "Scheduled"; // Scheduled, InProgress, Done

        public Room Room { get; set; }
    }
}

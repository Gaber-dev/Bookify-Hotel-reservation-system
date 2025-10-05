using System;

namespace Hotel_management_system.Models
{
    public class Shift
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime ShiftDate { get; set; }
        public TimeSpan Start { get; set; }
        public TimeSpan End { get; set; }
        public bool IsBreak { get; set; }

        public Employee Employee { get; set; }
    }
}

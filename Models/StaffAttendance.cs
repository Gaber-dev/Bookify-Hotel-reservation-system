using System;

namespace Hotel_management_system.Models
{
    public class StaffAttendance
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }

        public Employee Employee { get; set; }
    }
}

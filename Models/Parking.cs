namespace Hotel_management_system.Models
{
    public class Parking
    {
        public int Id { get; set; }
        public string SpotNumber { get; set; }
        public bool IsOccupied { get; set; } = false;
        public int? AssignedBookingId { get; set; }
    }
}

namespace Hotel_management_system.Models
{
    public class Facility
    {
        public int Id { get; set; }
        public string Name { get; set; } // Pool, Spa, Gym, KidsArea, Parking
        public string Type { get; set; }
        public bool IsAvailable { get; set; } = true;
        public decimal UsageFee { get; set; }
    }
}

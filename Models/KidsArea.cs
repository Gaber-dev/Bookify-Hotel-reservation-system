namespace Hotel_management_system.Models
{
    public class KidsArea
    {
        public int Id { get; set; }
        public string AreaName { get; set; }
        public bool IsAvailable { get; set; } = true;
        public string AgeRange { get; set; }
    }
}

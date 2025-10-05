using System;

namespace Hotel_management_system.Models
{
    public class ServiceDispatch
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public int? BookingId { get; set; }
        public int Quantity { get; set; }
        public DateTime DispatchedAt { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Dispatched";

        public InventoryItem InventoryItem { get; set; }
    }
}

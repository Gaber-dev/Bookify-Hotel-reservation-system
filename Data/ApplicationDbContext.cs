using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Hotel_management_system.Models;

namespace Hotel_management_system.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<StaffAttendance> StaffAttendances { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<KidsArea> KidsAreas { get; set; }
        public DbSet<Parking> Parkings { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<ServiceRequest> ServiceRequests { get; set; }
        public DbSet<HousekeepingSchedule> HousekeepingSchedules { get; set; }
        public DbSet<ServiceDispatch> ServiceDispatches { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Decimal precision setup
            modelBuilder.Entity<Booking>().Property(b => b.TotalCost).HasPrecision(18, 2);
            modelBuilder.Entity<Employee>().Property(e => e.Salary).HasPrecision(18, 2);
            modelBuilder.Entity<Facility>().Property(f => f.UsageFee).HasPrecision(18, 2);
            modelBuilder.Entity<InventoryItem>().Property(i => i.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<MenuItem>().Property(m => m.Price).HasPrecision(18, 2);
            modelBuilder.Entity<Payment>().Property(p => p.Amount).HasPrecision(18, 2);
            modelBuilder.Entity<Room>().Property(r => r.PricePerNight).HasPrecision(18, 2);
        }
    }
}

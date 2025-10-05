using Microsoft.AspNetCore.Mvc;
using Hotel_management_system.Data;
using Microsoft.EntityFrameworkCore;

namespace Hotel_management_system.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var totalRooms = await _context.Rooms.CountAsync();
            var availableRooms = await _context.Rooms.CountAsync(r => r.IsAvailable);
            var totalBookings = await _context.Bookings.CountAsync();
            var totalEmployees = await _context.Employees.CountAsync();
            var totalPayments = await _context.Payments.SumAsync(p => (decimal?)p.Amount) ?? 0;
            var totalRevenue = await _context.Bookings.SumAsync(b => (decimal?)b.TotalCost) ?? 0;

            ViewData["TotalRooms"] = totalRooms;
            ViewData["AvailableRooms"] = availableRooms;
            ViewData["TotalBookings"] = totalBookings;
            ViewData["TotalEmployees"] = totalEmployees;
            ViewData["TotalPayments"] = totalPayments;
            ViewData["TotalRevenue"] = totalRevenue;

            return View();
        }
    }
}

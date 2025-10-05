using Microsoft.AspNetCore.Identity;

namespace Hotel_management_system.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Add custom user fields here if needed
        public string? FullName { get; set; }
    }
}

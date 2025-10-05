using Microsoft.AspNetCore.Mvc;

namespace Hotel_management_system.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Validate user credentials
            if (request.Email == "admin@hotel.com" && request.Password == "password")
            {
                return Ok(new { token = "fake-jwt-token", user = new { name = "Admin" } });
            }
            return Unauthorized();
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}

using Microsoft.AspNetCore.Mvc;

namespace Madeira.Admin.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHealth()
        {
            return Ok(new { Status = "Healthy" });
        }
    }
}
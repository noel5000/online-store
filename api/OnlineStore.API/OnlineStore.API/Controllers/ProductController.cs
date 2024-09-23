using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Common;
using OnlineStore.Database;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ODataController
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly ApplicationDbContext _context;

        public ProductController(ILogger<WeatherForecastController> logger, ApplicationDbContext dbContext)
        {
            _context = dbContext;
            _logger = logger;
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get()
        {
            try
            {
                return await Task.Factory.StartNew<IActionResult>((arg) =>
                {
                    var sorting = arg as string;
                    return Ok( _context.Products.AsNoTracking().AsQueryable());
                }, null);
            }
            catch (Exception ex)
            {
                return Ok(new { status = -1, message = ex.Message });
            }
        }
    }
}

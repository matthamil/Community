using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Community.Models;
using Community.Models.AccountViewModels;
using Community.Services;
using Community.Data;

namespace Community.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class EventController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext context;

        public EventController(UserManager<ApplicationUser> userManager, ApplicationDbContext ctx)
        {
            _userManager = userManager;
            context = ctx;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        // GET api/event/
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            // IQueryable<Event> events = from orgEvent in context.Event select orgEvent;
            List<string> events = new List<string>{"Hello", "world"};
            return Json(events);
        }

        // GET api/event/get/3
        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Event orgEvent = context.Event.Single(o => o.EventId == id);
                if (orgEvent == null)
                {
                    return NotFound();
                }
                return Ok(orgEvent);
            }
            catch
            {
                return NotFound();
            }
        }

        //
        // GET api/event/organization/3
        // [HttpGet("{id}")]
        // public async Task<IActionResult> Organization([FromRoute] int id)
        // {

        // }

        // POST api/event/create
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody]Event orgEvent)
        {
            if (ModelState.IsValid)
            {
                context.Add(orgEvent);
                await context.SaveChangesAsync();
                return Json(orgEvent);
            }
            return BadRequest();
        }

        // POST api/event/edit
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Edit(Event orgEvent)
        {
            Event originalEvent = await context.Event.SingleAsync(o => o.EventId == orgEvent.EventId);

            if (ModelState.IsValid)
            {
                originalEvent.OrganizationId = orgEvent.OrganizationId;
                originalEvent.Name = orgEvent.Name;
                originalEvent.Address = orgEvent.Address;
                originalEvent.City = orgEvent.City;
                originalEvent.State = orgEvent.State;
                originalEvent.ZipCode = orgEvent.ZipCode;
                originalEvent.Date = orgEvent.Date;
                originalEvent.StartTime = orgEvent.StartTime;
                originalEvent.EndTime = orgEvent.EndTime;
                originalEvent.Description = orgEvent.Description;

                context.Entry(originalEvent).State = EntityState.Modified;
                context.Update(originalEvent);
                await context.SaveChangesAsync();

                return Json(originalEvent);
            }

            return BadRequest();
        }

        // POST api/event/delete/3
        [HttpDelete("{id}")]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Event eventToDelete = await context.Event.SingleAsync(o => o.EventId == id);

                if (eventToDelete == null)
                {
                    return NotFound();
                }

                context.Event.Remove(eventToDelete);
            }
            catch
            {
                return NotFound();
            }

            try
            {
                await context.SaveChangesAsync();
            }
            catch
            {
                return Forbid();
            }

            return new NoContentResult();
        }

    }
}

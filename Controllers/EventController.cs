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
using Community.Models.EventViewModels;
using Community.Models.EventMemberViewModels;
using Community.Models.AccountViewModels;
using Community.Services;
using Community.Data;

namespace Community.Controllers
{
    [Produces("application/json")]
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

        // GET /event/all
        [HttpGet]
        public async Task<IActionResult> All()
        {
            Event[] allEvents = await (
                from e in context.Event.Include(e => e.Organization).Include(e => e.EventMembers)
                where e.Organization.IsActive == true && e.Date > DateTime.Now
                select e
            ).ToArrayAsync();

            List<EventViewModel> model = new List<EventViewModel>();
            foreach(Event singleEvent in allEvents)
            {
                model.Add(new EventViewModel(singleEvent));
            }

            return Json(model);
        }

        // GET event/id?=3
        [HttpGet]
        public async Task<IActionResult> Id([FromQuery]int id)
        {
            Event singleEvent = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Where(e => e.EventId == id).SingleOrDefaultAsync();
            await context.Entry(singleEvent).Collection(e => e.EventMembers).LoadAsync();
            if (singleEvent == null) return NotFound();
            return Json(new EventViewModel(singleEvent));
        }

        // GET event/orgId?=3&includePastEvents=true
        [HttpGet]
        public async Task<IActionResult> OrgId(int id, bool includePastEvents)
        {
            List<Event> allEvents = null;
            if (includePastEvents)
            {
                allEvents = await context.Event.Include(e => e.Organization).Include(e => e.EventMembers).Where(e => e.Organization.OrganizationId == id).ToListAsync();
            }
            else
            {
                allEvents = await context.Event.Include(e => e.Organization).Include(e => e.EventMembers).Where(e => e.Organization.OrganizationId == id && e.Date > DateTime.Now).ToListAsync();
            }
            if (allEvents == null) return NotFound();
            List<EventViewModel> model = new List<EventViewModel>();
            foreach (Event singleEvent in allEvents)
            {
                model.Add(new EventViewModel(singleEvent));
            }
            return Json(model);
        }

        // GET /event/location?city=Nashville&state=TN
        [HttpGet]
        public async Task<IActionResult> Location(string city, string state)
        {
            List<Event> allEvents = null;
            if (city != null && state == null)
            {
                allEvents = await context.Event.Include(e => e.Organization).Include(e => e.EventMembers).Where(e => e.City == city && e.Date > DateTime.Now).ToListAsync();
            }
            else if (city == null && state != null)
            {
                allEvents = await context.Event.Include(e => e.Organization).Include(e => e.EventMembers).Where(e => e.State == state && e.Date > DateTime.Now).ToListAsync();
            }
            else if (city == null && state == null)
            {
                return BadRequest();
            }
            else
            {
                allEvents = await context.Event.Include(e => e.Organization).Include(e => e.EventMembers).Where(e => e.City == city && e.State == state && e.Date > DateTime.Now).ToListAsync();
            }
            if (allEvents == null) return NotFound();

            List<EventViewModel> model = new List<EventViewModel>();
            foreach (Event singleEvent in allEvents)
            {
                model.Add(new EventViewModel(singleEvent));
            }
            return Json(model);
        }

        // POST /event/create
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
                originalEvent.Organization = orgEvent.Organization;
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

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
    /**
     * Class: EventController
     * Purpose: Manages Event API endpoints
     * Methods:
     *   Get([FromQuery]string city, [FromQuery]string state) - Gets events that have yet to occur
     *   GetById([FromRoute]int id) - Gets a single event by ID
     *   GetByOrgId([FromRoute]int id, [FromQuery]bool includePastEvents) - Get all events hosted by an org (optional: include past events)
     *   Post([FromBody]CreateEventViewModel orgEvent) - Create a new event
     *   Patch([FromRoute]int id, [FromBody]EditEventViewModel orgEvent) - Edit an existing event
     *   Delete([FromRoute]int id) - Delete an event by ID
     */
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

        /**
         * GET /event/?city=Nashville&state=TN
         * Purpose: Gets all events that have yet to occur. Optional, can search by location
         * Args:
         *      string city - (Optional) search by city
         *      string state - (Optional) search by state
         * Return:
         *      List<EventViewModel>
         */
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> Get([FromQuery]string city, [FromQuery]string state)
        {
            List<Event> allEvents = null;
            if (city != null && state == null)
            {
                allEvents = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).Where(e => e.City == city && e.Date > DateTime.Now).OrderBy(e => e.StartTime).ToListAsync();
            }
            else if (city == null && state != null)
            {
                allEvents = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).Where(e => e.State == state && e.Date > DateTime.Now).OrderBy(e => e.StartTime).ToListAsync();
            }
            else if (city == null && state == null)
            {
                allEvents = await (
                    from e in context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).OrderBy(e => e.StartTime)
                    where e.Organization.IsActive == true && e.Date > DateTime.Now
                    select e
                ).ToListAsync();
            }
            else
            {
                allEvents = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).Where(e => e.City == city && e.State == state && e.Date > DateTime.Now).ToListAsync();
            }
            if (allEvents == null || allEvents.Count == 0) return NotFound();

            List<EventViewModel> model = new List<EventViewModel>();
            foreach (Event singleEvent in allEvents)
            {
                model.Add(new EventViewModel(singleEvent, await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventId == singleEvent.EventId).ToArrayAsync()));
            }
            return Json(model);
        }

        /**
         * GET /event/3
         * Purpose: Gets a single event by ID
         * Args:
         *      id - Event ID
         * Return:
         *      EventViewModel
         */
        [HttpGet]
        [Route("[controller]/{id}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            Event singleEvent = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Where(e => e.EventId == id).SingleOrDefaultAsync();
            if (singleEvent == null) return NotFound();
            await context.Entry(singleEvent).Collection(e => e.EventMembers).LoadAsync();
            EventMember[] singleEventMembers = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventId == singleEvent.EventId).ToArrayAsync();
            EventViewModel model = new EventViewModel(singleEvent, singleEventMembers);
            return Json(model);
        }

        /**
         * GET /event/org/1?includePastEvents=true
         * Purpose: Get a list of events hosted by a specific organization
         * Args:
         *      int id - Organization ID
         *      bool includePastEvents - (Optional) include events that have already occured
         * Return:
         *      List<EventViewModel>
         */
        [HttpGet]
        [Route("[controller]/org/{id}")]
        public async Task<IActionResult> GetByOrgId([FromRoute]int id, [FromQuery]bool includePastEvents)
        {
            List<Event> allEvents = null;
            if (includePastEvents)
            {
                allEvents = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).Where(e => e.Organization.OrganizationId == id).OrderBy(e => e.StartTime).ToListAsync();
            }
            else
            {
                allEvents = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Include(e => e.EventMembers).Where(e => e.Organization.OrganizationId == id && e.Date > DateTime.Now).OrderBy(e => e.StartTime).ToListAsync();
            }
            if (allEvents == null) return NotFound();
            List<EventViewModel> model = new List<EventViewModel>();
            foreach (Event singleEvent in allEvents)
            {
                model.Add(new EventViewModel(singleEvent, await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventId == singleEvent.EventId).ToArrayAsync()));
            }
            return Json(model);
        }

        /**
         * POST /event/
         * Purpose: Creates a new event
         * Args:
         *      CreateEventViewModel orgEvent - New event
         * Return:
         *      EventViewModel
         */
        [HttpPost]
        // [Authorize]
        [Route("[controller]")]
        public async Task<IActionResult> Post([FromBody]CreateEventViewModel orgEvent)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // Uncomment for testing
                // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");
                Organization org = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == orgEvent.OrganizationId && o.Organizer.Id == user.Id).SingleOrDefaultAsync();
                if (org == null || org.Organizer != user)
                {
                    return BadRequest(new
                    {
                        Error = $"Can't find organization with id {orgEvent.OrganizationId} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                        StatusCode = "400"
                    });
                }

                Event newEvent = new Event()
                {
                    Organization = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == orgEvent.OrganizationId).SingleOrDefaultAsync(),
                    Name = orgEvent.Name,
                    Description = orgEvent.Description,
                    City = orgEvent.City,
                    State = orgEvent.State,
                    Address = orgEvent.Address,
                    ZipCode = orgEvent.ZipCode,
                    Date = orgEvent.Date,
                    StartTime = orgEvent.StartTime,
                    EndTime = orgEvent.EndTime
                };

                await context.AddAsync(newEvent);
                await context.SaveChangesAsync();
                EventViewModel model = new EventViewModel(newEvent);
                return Json(model);
            }
            return BadRequest();
        }

        /**
         * PATCH /event/3
         * Purpose: Edit an existing event
         * Args:
         *      EditEventViewModel orgEvent - Existing event
         * Return:
         *      EventViewModel
         */
        [HttpPatch]
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Patch([FromRoute]int id, [FromBody]EditEventViewModel orgEvent)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // Uncomment for testing
                // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Steve");
                Organization org = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == orgEvent.OrganizationId && o.Organizer.Id == user.Id).SingleOrDefaultAsync();
                if (org == null || org.Organizer != user)
                {
                    return BadRequest(new
                    {
                        Error = $"Can't find organization with id {orgEvent.OrganizationId} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                        StatusCode = "400"
                    });
                }

                Event originalEvent = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Where(e => e.EventId == id).SingleOrDefaultAsync();
                if (originalEvent == null) return NotFound();

                originalEvent.Name = orgEvent.Name;
                originalEvent.Description = orgEvent.Description;
                originalEvent.City = orgEvent.City;
                originalEvent.State = orgEvent.State;
                originalEvent.Address = orgEvent.Address;
                originalEvent.ZipCode = orgEvent.ZipCode;
                originalEvent.Date = orgEvent.Date;
                originalEvent.StartTime = orgEvent.StartTime;
                originalEvent.EndTime = orgEvent.EndTime;

                context.Entry(originalEvent).State = EntityState.Modified;
                context.Update(originalEvent);
                await context.SaveChangesAsync();

                EventViewModel model = new EventViewModel(originalEvent);
                return Json(model);
            }
            return BadRequest(ModelState);
        }

        /**
         * DELETE /event/3
         * Purpose: Deletes an event
         * Args:
         *      int id - Event id
         * Return:
         *      NoContentResult
         */
        [HttpDelete]
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();

            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Steve");

            Organization org = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == id && o.Organizer.Id == user.Id).SingleOrDefaultAsync();

            if (org == null || org.Organizer != user) {
                return BadRequest(new
                {
                    Error = $"Can't find event with id {id} hosted by {org.Name} and organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                    StatusCode = "400"
                });
            }

            // Delete all event members and chatroom messages associated with event
            EventMember[] eventMembers = await context.EventMember.Where(e => e.EventId == id).ToArrayAsync();
            EventChatroomMessage[] chatMessages = await context.EventChatroomMessage.Include(e => e.EventMember).Where(e => e.EventMember.EventId == id).ToArrayAsync();
            Event eventToDelete = await context.Event.Where(e => e.EventId == id).SingleOrDefaultAsync();

            context.RemoveRange(chatMessages);
            context.RemoveRange(eventMembers);
            context.Remove(eventToDelete);
            await context.SaveChangesAsync();

            return new NoContentResult();
        }

    }
}

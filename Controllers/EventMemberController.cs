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
     * Class: EventMemberController
     * Purpose: Manages EventMember API endpoints
     * Methods:
     *   All() - Gets all of the event members assigned to the user
     *   Id(int id) - Gets single event member by id
     *   Upcoming() - Gets all upcoming event members assigned to the user
     *   Past() - Gets all past event members assigned to the user
     *   Create(CreateEventMemberViewModel eMember) - Creates a new event member
     *   Update(UpdateEventMemberViewModel eMember) - Updates an existing event member
     *   Claim(int id) - Claims an available event member
     *   Unclaim(int id) - Unclaims an event member
     *   Delete(int id) - Deletes an event member and associated chat messages
     */
    [Produces("application/json")]
    public class EventMemberController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext context;

        public EventMemberController(UserManager<ApplicationUser> userManager, ApplicationDbContext ctx)
        {
            _userManager = userManager;
            context = ctx;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        /**
         * GET /eventmember/all
         * Purpose: Gets all of the event members assigned to the logged in user
         * Return:
         *      List<EventMemberViewModel>
         */
        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> All()
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();
            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Steve");
            EventMember[] eMemberList = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.ApplicationUser == user).ToArrayAsync();
            List<EventMemberViewModel> model = new List<EventMemberViewModel>();
            foreach(EventMember eMember in eMemberList)
            {
                model.Add(new EventMemberViewModel(eMember));
            }
            return Json(model);
        }

        /**
         * GET /eventmember/id?=3
         * Purpose: Gets a single of the event member by id
         * Args:
         *      int id - event member id
         * Return:
         *      EventMemberViewModel
         */
        [HttpGet]
        public async Task<IActionResult> Id([FromQuery]int id)
        {
            EventMember eMember = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventMemberId == id).SingleOrDefaultAsync();
            EventMemberViewModel model = new EventMemberViewModel(eMember);
            return Json(model);
        }

        /**
         * GET /eventmember/upcoming
         * Purpose: Gets all of the upcoming event members assigned to the logged in user
         * Return:
         *      List<EventMemberViewModel>
         */
        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> Upcoming()
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();
            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Steve");
            EventMember[] eMemberList = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.ApplicationUser == user && e.StartTime > DateTime.Now).ToArrayAsync();
            List<EventMemberViewModel> model = new List<EventMemberViewModel>();
            foreach(EventMember eMember in eMemberList)
            {
                model.Add(new EventMemberViewModel(eMember));
            }
            return Json(model);
        }

        /**
         * GET /eventmember/past
         * Purpose: Gets all of the past event members assigned to the logged in user
         * Return:
         *      List<EventMemberViewModel>
         */
        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> Past()
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();
            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Steve");
            EventMember[] eMemberList = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.ApplicationUser == user && e.StartTime < DateTime.Now).ToArrayAsync();
            List<EventMemberViewModel> model = new List<EventMemberViewModel>();
            foreach(EventMember eMember in eMemberList)
            {
                model.Add(new EventMemberViewModel(eMember));
            }
            return Json(model);
        }

        /**
         * POST /eventmember/create
         * Purpose: Adds a new event member to an existing event
         * Args:
         *      CreateEventMemberViewModel eMember - New event member
         * Return:
         *      EventMemberViewModel
         */
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody]CreateEventMemberViewModel eMember)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // Uncomment for testing
                // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Steve");

                Event singleEvent = await context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer).Where(e => e.EventId == eMember.EventId && e.Organization.Organizer == user).SingleOrDefaultAsync();

                // Check if user is the organizer
                if (singleEvent == null || singleEvent.Organization.Organizer != user)
                {
                    return BadRequest(new
                    {
                        Error = $"Can't find event with id {eMember.EventId} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                        StatusCode = "400"
                    });
                }

                EventMember newEventMember = new EventMember()
                {
                    EventId = eMember.EventId,
                    Event = singleEvent,
                    JobTitle = eMember.JobTitle,
                    Description = eMember.Description,
                    StartTime = eMember.StartTime,
                    EndTime = eMember.EndTime,
                    ChatMuted = eMember.ChatMuted,
                    AttendeePoints = eMember.AttendeePoints
                };

                await context.AddAsync(newEventMember);
                await context.SaveChangesAsync();
                EventMemberViewModel model = new EventMemberViewModel(newEventMember);
                return Json(model);
            }
            return BadRequest(ModelState);
        }

        /**
         * PATCH /eventmember/update/3
         * Purpose: Adds a product to a user's open order
         * Args:
         *      EditEventMemberViewModel - Updated event member
         *      id - Event Member ID
         * Return:
         *      EventMemberViewModel
         */
        [HttpPatch]
        // [Authorize]
        public async Task<IActionResult> Update([FromBody]EditEventMemberViewModel eMember, [FromRoute]int id)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // Uncomment for testing
                // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Steve");

                Event singleEvent = await (
                    from events in context.Event.Include(e => e.Organization).ThenInclude(o => o.Organizer)
                    join emembers in context.EventMember on events.EventId equals emembers.EventId
                    where emembers.EventMemberId == id
                    select events
                ).SingleOrDefaultAsync();

                // Check if user is the organizer
                if (singleEvent == null || singleEvent.Organization.Organizer != user)
                {
                    return BadRequest(new
                    {
                        Error = $"Can't find event member with id {id}.",
                        StatusCode = "400"
                    });
                }

                EventMember eMemberToChange = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventMemberId == id).SingleOrDefaultAsync();

                eMemberToChange.JobTitle = eMember.JobTitle;
                eMemberToChange.Description = eMember.Description;
                eMemberToChange.StartTime = eMember.StartTime;
                eMemberToChange.EndTime = eMember.EndTime;
                eMemberToChange.ChatMuted = eMember.ChatMuted;
                eMemberToChange.AttendeePoints = eMember.AttendeePoints;

                context.Entry(eMemberToChange).State = EntityState.Modified;
                context.Update(eMemberToChange);
                await context.SaveChangesAsync();

                EventMemberViewModel model = new EventMemberViewModel(eMemberToChange);
                return Json(model);
            }
            return BadRequest(ModelState);
        }

        /**
         * POST /eventmember/claim/3
         * Purpose: Assigns the logged in user as the event member volunteer
         * Args:
         *      id - event member id
         * Return:
         *      EventMemberViewModel
         */
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Claim([FromRoute]int id)
        {
            // var user = await GetCurrentUserAsync();
            // Uncomment for testing
            ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");

            EventMember eMember = await context.EventMember.Where(e => e.EventMemberId == id && e.ApplicationUser == null).SingleOrDefaultAsync();

            // Check if event member is already claimed
            if (eMember == null)
            {
                return BadRequest(new
                {
                    Error = $"Event member with id {id} has already been claimed.",
                    StatusCode = "400"
                });
            }

            // Find any events where the user has claimed an event member
            // where the time conflicts with this event
            EventMember userClaimed = await context.EventMember.Where(e =>
                (e.StartTime > eMember.StartTime && e.EndTime < eMember.EndTime) ||
                (e.StartTime < eMember.StartTime && e.EndTime > eMember.StartTime && e.EndTime < eMember.EndTime)).SingleOrDefaultAsync();

            if (userClaimed != null)
            {
                return BadRequest(new
                {
                    Error = $"You are already signed up for an event during this time.",
                    Event = userClaimed,
                    StatusCode = "400"
                });
            }

            eMember.ApplicationUser = user;
            context.Entry(eMember).State = EntityState.Modified;
            context.Update(eMember);
            await context.SaveChangesAsync();

            return Json(new EventMemberViewModel(eMember));
        }

        /**
         * POST /eventmember/unclaim/3
         * Purpose: Removes user's claim from event member
         * Args:
         *      id - event member id
         * Return:
         *      NoContentResult
         */
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Unclaim([FromRoute]int id)
        {
            // var user = await GetCurrentUserAsync();
            // Uncomment for testing
            ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");

            EventMember eMember = await context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventMemberId == id && e.ApplicationUser == user).SingleOrDefaultAsync();

            if (eMember == null)
            {
                return BadRequest(new
                {
                    Error = $"You are not signed up for this event.",
                    StatusCode = "400"
                });
            }

            eMember.ApplicationUser = null;
            context.Entry(eMember).State = EntityState.Modified;
            context.Update(eMember);
            await context.SaveChangesAsync();
            return new NoContentResult();
        }

        /**
         * DELETE /eventmember/delete/3
         * Purpose: Deletes an event member and chat messages
         * Args:
         *      id - event member id
         * Return:
         *      NoContentResult
         */
        [HttpDelete]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();

            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Steve");

            Organization org = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == id && o.Organizer.Id == user.Id).SingleOrDefaultAsync();

            if (org == null || org.Organizer != user) {
                return new ForbidResult($"Can't delete event member with ID {id}");
            }

            // Delete event member and chatroom messages associated
            EventMember eventMember = await context.EventMember.Where(e => e.EventMemberId == id).SingleOrDefaultAsync();
            EventChatroomMessage[] chatMessages = await context.EventChatroomMessage.Include(e => e.EventMember).Where(e => e.EventMember.ApplicationUser == user).ToArrayAsync();

            context.RemoveRange(chatMessages);
            context.Remove(eventMember);
            await context.SaveChangesAsync();

            return new NoContentResult();
        }
    }
}
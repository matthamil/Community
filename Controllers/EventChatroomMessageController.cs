using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Community.Models;
using Community.Models.EventChatroomMessageViewModels;
using Community.Data;
using Community.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace Community.Controllers
{
    /**
     * Class: EventChatroomMessageController
     * Purpose: Manages Event Chatroom Message API endpoints
     * Methods:
     *   Get([FromRoute]int id) - Get all messages by event id
     *   Post([FromBody]CreateEventChatroomMessageViewModel message) - Post a new message in a chat
     *   Patch([FromBody]EditEventChatroomMessageViewModel message) - Edit an existing message
     *   Delete([FromRoute]int id) - Delete a chatroom message
     */
    [Produces("application/json")]
    public class EventChatroomMessageController : ApiHubController<Broadcaster>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _context;

        public EventChatroomMessageController(UserManager<ApplicationUser> userManager, ApplicationDbContext ctx, IConnectionManager connectionManager)
        : base(connectionManager)
        {
            _userManager = userManager;
            _context = ctx;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        /**
         * Purpose: Checks if the current user is a member of an event
         * Args:
         *      eventId - an event id
         * Return:
         *      bool
         */
        private async Task<bool> _validateUserInEvent(int eventId)
        {
            ApplicationUser user = await GetCurrentUserAsync();
            // Uncomment for testing
            // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");

            EventMember[] eMember = await _context.EventMember.Include(e => e.ApplicationUser)
                .Include(e => e.Event)
                .Where(e => e.ApplicationUser == user && e.EventId == eventId)
                .ToArrayAsync();

            // If the user is the event organizer, eventForChatroom should not be null.
            Event eventForChatroom = await _context.Event.Include(e => e.Organization)
                .ThenInclude(o => o.Organizer)
                .Where(e => e.EventId == eventId && e.Organization.Organizer.Id == user.Id)
                .SingleOrDefaultAsync();

            return (eMember != null || eMember.Length == 0 || eventForChatroom != null);
        }

        /**
         * GET /eventchatroommessage/3
         * Purpose: Get all messages by event id
         * Args:
         *      id - Event id
         * Return:
         *      List<EventChatroomMessageViewModel>
         */
        [HttpGet]
        [Route("[controller]/{eventId}")]
        // [Authorize]
        public async Task<IActionResult> Get([FromRoute]int eventId)
        {
            if (await _validateUserInEvent(eventId))
            // if (true) <-- uncomment for testing purposes
            {
                List<EventChatroomMessage> messages = await _context.EventChatroomMessage.Include(m => m.Author)
                    .Where(e => e.EventId == eventId)
                    .OrderBy(m => m.DateCreated)
                    .ToListAsync();
                List<EventChatroomMessageViewModel> model = new List<EventChatroomMessageViewModel>();
                foreach(EventChatroomMessage m in messages)
                {
                    EventMember[] allEventMembersForAuthorOfMessage = await _context.EventMember
                        .Include(e => e.ApplicationUser)
                        .Include(e => e.Event)
                        .Include(e => e.Event.Organization)
                        .Where(e => e.ApplicationUser.Id == m.AuthorId && e.EventId == eventId)
                        .ToArrayAsync();

                    // If message author is the event organizer, hostedEvents hould be null
                    Event hostedEvent = await _context.Event.Include(e => e.Organization)
                        .ThenInclude(o => o.Organizer)
                        .Where(e => e.Organization.Organizer.Id == m.AuthorId && e.EventId == m.EventId)
                        .SingleOrDefaultAsync();

                    var organizer = await _context.ApplicationUser.Where(u => u.Id == m.AuthorId).SingleOrDefaultAsync();

                    // If the author is the event organizer and not an event member
                    if (allEventMembersForAuthorOfMessage == null || allEventMembersForAuthorOfMessage.Length == 0 && hostedEvent != null)
                    {
                        model.Add(new EventChatroomMessageViewModel(m, organizer));
                    }
                    // If the author is an event member and not the organizer
                    else if (allEventMembersForAuthorOfMessage != null && allEventMembersForAuthorOfMessage.Length > 0 && hostedEvent == null)
                    {
                        model.Add(new EventChatroomMessageViewModel(m, allEventMembersForAuthorOfMessage));
                    }
                    // If the author is the organizer and is an event member
                    else if (allEventMembersForAuthorOfMessage != null && allEventMembersForAuthorOfMessage.Length > 0 && hostedEvent != null)
                    {
                        model.Add(new EventChatroomMessageViewModel(m, organizer, allEventMembersForAuthorOfMessage));
                    }
                }
                return Json(model);
            }
            return new ForbidResult();
        }

        /**
         * POST /eventchatroommessage/3
         * Purpose: Posts a new message to an event chatroom
         * Args:
         *      CreateEventChatroomMessageViewModel message - new message from the client
         * Return:
         *      EventChatroomMessageViewModel
         */
        [HttpPost]
        [Route("[controller]/{eventId}")]
        // [Authorize]
        public async Task<IActionResult> Post([FromRoute]int eventId, [FromBody]CreateEventChatroomMessageViewModel message)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();

                EventMember[] eventMember = await _context.EventMember.Include(m => m.ApplicationUser)
                    .Where(e => e.EventId == eventId && e.ApplicationUser.Id == user.Id)
                    .ToArrayAsync();

                Event hostedEvent = await _context.Event.Include(e => e.Organization)
                    .ThenInclude(o => o.Organizer)
                    .Where(e => e.Organization.Organizer.Id == user.Id && e.EventId == eventId)
                    .SingleOrDefaultAsync();

                // If the user is neither an event member nor the event organizer, forbid
                if (eventMember == null && hostedEvent == null) return Forbid();

                EventChatroomMessage newMessage = new EventChatroomMessage()
                {
                    Message = message.Message,
                    Author = user,
                    AuthorId = user.Id,
                    EventId = eventId
                };

                await _context.AddAsync(newMessage);
                await _context.SaveChangesAsync();
                await _context.Entry(newMessage).GetDatabaseValuesAsync();

                EventChatroomMessageViewModel model = null;

                // If the user was an event member AND the organizer of the event
                if (eventMember != null && hostedEvent != null)
                {
                    model = new EventChatroomMessageViewModel(newMessage, user, eventMember);
                }
                // If the user was an event member and NOT the organizer of the event
                else if (eventMember != null && hostedEvent == null)
                {
                    model = new EventChatroomMessageViewModel(newMessage, eventMember);
                }
                // If the user was NOT an event member AND is the organizer of the event
                else if (eventMember == null && hostedEvent != null)
                {
                    model = new EventChatroomMessageViewModel(newMessage, user);
                }

                this.Clients.Group("Event" + eventId.ToString()).AddChatMessage(model);
                return Json(model);
            }
            return NotFound();
        }

        /**
         * PATCH /eventchatroommessage/
         * Purpose: Edits an existing chatroom message
         * Args:
         *      EditEventChatroomMessageViewModel message - edited message from the client
         * Return:
         *      NoContentResult
         */
        [HttpPatch]
        [Route("[controller]/{eventId}/{messageId}")]
        // [Authorize]
        public async Task<IActionResult> Patch([FromRoute]int eventId, [FromRoute]int messageId, [FromBody]EditEventChatroomMessageViewModel message)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();

                EventChatroomMessage originalMessage = await _context.EventChatroomMessage.Where(m => m.EventChatroomMessageId == messageId && m.EventId == eventId).SingleOrDefaultAsync();

                if (originalMessage == null) return NotFound();

                EventMember[] allEventMembersForAuthorOfMessage = await _context.EventMember.Where(e => e.EventId == originalMessage.EventId && e.ApplicationUser.Id == user.Id).ToArrayAsync();

                Event hostedEvent = await _context.Event.Include(e => e.Organization)
                    .ThenInclude(o => o.Organizer)
                    .Where(e => e.Organization.Organizer.Id == user.Id && e.EventId == originalMessage.EventId)
                    .SingleOrDefaultAsync();

                originalMessage.Message = message.Message;
                originalMessage.LastModified = DateTime.Now;

                _context.Entry(originalMessage).State = EntityState.Modified;
                _context.Update(originalMessage);
                await _context.SaveChangesAsync();
                await _context.Entry(originalMessage).GetDatabaseValuesAsync();

                EventChatroomMessageViewModel model = null;

                // If the user was an event member AND the organizer of the event
                if (allEventMembersForAuthorOfMessage != null && hostedEvent != null)
                {
                    model = new EventChatroomMessageViewModel(originalMessage, user, allEventMembersForAuthorOfMessage);
                }
                // If the user was an event member and NOT the organizer of the event
                else if (allEventMembersForAuthorOfMessage != null && hostedEvent == null)
                {
                    model = new EventChatroomMessageViewModel(originalMessage, allEventMembersForAuthorOfMessage);
                }
                // If the user was NOT an event member AND is the organizer of the event
                else if (allEventMembersForAuthorOfMessage == null && hostedEvent != null)
                {
                    model = new EventChatroomMessageViewModel(originalMessage, user);
                }

                model.LastModified = originalMessage.LastModified;

                this.Clients.Group("Event" + originalMessage.EventId.ToString()).EditChatMessage(model);
                return new NoContentResult();
            }
            return NotFound(ModelState);
        }

        /**
         * DELETE /eventchatroommessages/3
         * Purpose: Deletes an event chatroom message
         * Args:
         *      id - Event chatroom message id
         * Return:
         *      NoContentResult
         */
        [HttpDelete]
        // [Authorize]
        [Route("[controller]/{eventId}/{messageId}")]
        public async Task<IActionResult> Delete([FromRoute]int eventId, [FromRoute]int messageId)
        {
            if (await _validateUserInEvent(eventId))
            {
                ApplicationUser user = await GetCurrentUserAsync();
                EventChatroomMessage messageToDelete = await _context.EventChatroomMessage.Where(m => m.EventChatroomMessageId == messageId && m.AuthorId == user.Id).SingleOrDefaultAsync();
                if (messageToDelete == null)
                {
                    return NotFound();
                }
                _context.Remove(messageToDelete);
                await _context.SaveChangesAsync();
                this.Clients.Group("Event" + eventId.ToString()).DeleteChatMessage(messageId);
                return new NoContentResult();
            }
            return new ForbidResult();
        }
    }
}
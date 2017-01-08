using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Community.Models;
using Community.Models.EventMemberViewModels;
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

            EventMember eMember = await _context.EventMember.Include(e => e.ApplicationUser)
                .Include(e => e.Event)
                .Where(e => e.ApplicationUser == user && e.EventId == eventId)
                .SingleOrDefaultAsync();

            // If the user is the event organizer, eventForChatroom should not be null.
            Event eventForChatroom = await _context.Event.Include(e => e.Organization)
                .ThenInclude(o => o.Organizer)
                .Where(e => e.EventId == eventId && e.Organization.Organizer.Id == user.Id)
                .SingleOrDefaultAsync();

            return (eMember != null || eventForChatroom != null);
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
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Get([FromRoute]int id)
        {
            if (await _validateUserInEvent(id))
            // if (true) <-- uncomment for testing purposes
            {
                List<EventChatroomMessage> messages = await _context.EventChatroomMessage.Include(e=> e.EventMember).ThenInclude(m => m.ApplicationUser).Where(e => e.EventMember.EventId == id).ToListAsync();
                List<EventChatroomMessageViewModel> model = new List<EventChatroomMessageViewModel>();
                foreach(EventChatroomMessage m in messages)
                {
                    model.Add(new EventChatroomMessageViewModel(m));
                }
                // Uncomment the code below for testing purposes when an event has 0 messages
                // if (model.Count == 0) {
                //     return Json(new EventChatroomMessageViewModel {
                //         EventMember = new EventMemberViewModel(_context.EventMember.Where(e => e.EventMemberId == 2).SingleOrDefault()),
                //         Message = "Hello from the server!",
                //         Timestamp = DateTime.Now
                //     });
                // }
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
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Post([FromRoute]int id, [FromBody]CreateEventChatroomMessageViewModel message)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                EventMember eventMember = await _context.EventMember.Include(m => m.ApplicationUser).Where(e => e.EventMemberId == id && e.ApplicationUser.Id == user.Id).SingleOrDefaultAsync();
                if (eventMember == null) return NotFound();

                EventChatroomMessage newMessage = new EventChatroomMessage()
                {
                    EventMember = eventMember,
                    Message = message.Message
                };

                await _context.AddAsync(newMessage);
                await _context.SaveChangesAsync();
                await _context.Entry(newMessage).GetDatabaseValuesAsync();

                EventChatroomMessageViewModel model = new EventChatroomMessageViewModel()
                {
                    EventMember = new EventMemberViewModel(eventMember),
                    Message = newMessage.Message,
                    Timestamp = newMessage.DateCreated,
                    EventChatroomMessageId = newMessage.EventChatroomMessageId
                };
                this.Clients.Group("Event" + eventMember.EventId.ToString()).AddChatMessage(model);
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
        [Route("[controller]")]
        // [Authorize]
        public async Task<IActionResult> Patch([FromBody]EditEventChatroomMessageViewModel message)
        {
            //if (await _validateUserInEvent(id))
            if (ModelState.IsValid)
            {
                EventMember eventMember = await _context.EventMember.Include(e => e.ApplicationUser).Where(e => e.EventMemberId == message.EventMemberId).SingleOrDefaultAsync();
                EventChatroomMessage originalMessage = await _context.EventChatroomMessage.Where(m => m.EventChatroomMessageId == message.EventChatroomMessageId).SingleOrDefaultAsync();

                if (originalMessage == null) return NotFound();

                originalMessage.Message = message.Message;
                originalMessage.LastModified = DateTime.Now;

                _context.Entry(originalMessage).State = EntityState.Modified;
                _context.Update(originalMessage);
                await _context.SaveChangesAsync();

                EventChatroomMessageViewModel model = new EventChatroomMessageViewModel()
                {
                    EventMember = new EventMemberViewModel(eventMember),
                    Message = originalMessage.Message,
                    Timestamp = originalMessage.DateCreated,
                    LastModified = originalMessage.LastModified,
                    EventChatroomMessageId = originalMessage.EventChatroomMessageId
                };

                this.Clients.Group("Event" + eventMember.EventId.ToString()).EditChatMessage(model);
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
        [Route("[controller]/{id}")]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (await _validateUserInEvent(id))
            // if (true) <-- uncomment for testing purposes
            {
                ApplicationUser user = await GetCurrentUserAsync();
                EventChatroomMessage messageToDelete = await _context.EventChatroomMessage.Where(m => m.EventChatroomMessageId == id && m.EventMember.ApplicationUser == user).SingleOrDefaultAsync();
                if (messageToDelete == null)
                {
                    return NotFound();
                }
                _context.Remove(messageToDelete);
                await _context.SaveChangesAsync();
                return new NoContentResult();
            }
            return new ForbidResult();
        }
    }
}
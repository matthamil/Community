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
using Community.Models.EventChatroomMessageViewModels;
using Community.Services;
using Community.Data;
using Community.Interfaces;
using Community.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace Community.Controllers
{
    [Produces("application/json")]
    public class EventChatroomMessageController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _context;
        private IConnectionManager _connectionManager { get; set; }

        public EventChatroomMessageController(UserManager<ApplicationUser> userManager, ApplicationDbContext ctx, IConnectionManager connectionManager)
        {
            _userManager = userManager;
            _context = ctx;
            _connectionManager = connectionManager;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        private async Task<bool> _validateUserInEvent(int eventId)
        {
            ApplicationUser user = await GetCurrentUserAsync();
            // Uncomment for testing
            // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");

            EventMember eMember = await _context.EventMember.Include(e => e.ApplicationUser).Where(e => e.ApplicationUser == user && e.EventId == eventId).SingleOrDefaultAsync();
            return eMember != null ? true : false;
        }

        // Validate if logged in user is part of event
        // If not, return Forbidden
        // If validated, return all chatroom messages for event
        // GET /eventchatroommessage/{eventId}
        [HttpGet]
        public async Task<IActionResult> GetMessages([FromRoute]int id)
        {
            if (await _validateUserInEvent(id))
            {
                List<EventChatroomMessage> messages = await _context.EventChatroomMessage.Where(e => e.EventMember.EventId == id).ToListAsync();
                List<EventChatroomMessageViewModel> model = new List<EventChatroomMessageViewModel>();
                foreach(EventChatroomMessage m in messages)
                {
                    model.Add(new EventChatroomMessageViewModel(m));
                }
                return Json(model);
            }
            return NotFound();
        }

        // POST /eventchatroommessage/addmessage/
        [HttpPost]
        // [Authorize]
        public async Task AddMessage([FromBody]CreateEventChatroomMessageViewModel message)
        {
            if (ModelState.IsValid)
            {
                EventMember eventMember = await _context.EventMember.Where(e => e.EventMemberId == message.EventMemberId).SingleOrDefaultAsync();

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

                _connectionManager.GetHubContext<EventChatroomMessageHub>().Clients.All.publishChatMessage(model);
            }
        }

        // PATCH /eventchatroommessage/editmessage/
        [HttpPatch]
        // [Authorize]
        public async Task EditMessage([FromBody]EditEventChatroomMessageViewModel message)
        {
            if (ModelState.IsValid)
            {
                EventMember eventMember = await _context.EventMember.Where(e => e.EventMemberId == message.EventMemberId).SingleOrDefaultAsync();
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

                _connectionManager.GetHubContext<EventChatroomMessageHub>().Clients.All.publishChatMessage(model);
            }
        }

    }
}
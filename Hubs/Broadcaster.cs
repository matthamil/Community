using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Community.Models;
using Community.Models.EventChatroomMessageViewModels;

namespace Community.Hubs
{
    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            // Set connection id for just connected client only
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        // Server side methods called from client
        public Task Subscribe(int eventId)
        {
            return Groups.Add(Context.ConnectionId, "Event" + eventId.ToString());
        }

        public Task Unsubscribe(int eventId)
        {
            return Groups.Remove(Context.ConnectionId, eventId.ToString());
        }
    }

    // Client side methods to be invoked by Broadcaster Hub
    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task UpdateMessage(EditEventChatroomMessageViewModel message);
        Task DeleteChatMessage(int id);
        Task AddChatMessage(CreateEventChatroomMessageViewModel message);
    }
}
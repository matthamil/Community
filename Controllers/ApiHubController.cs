using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace Community.Controllers
{
    /**
     * Class: ApiHubController
     * Purpose: SignalR controller class to gain access to hub clients inside a controller
     * Methods:
     *   ApiHubController(IConnectionManager signalRConnectionManager) - Initialize with access to SignalR hub context, clients, and groups
     */
    public abstract class ApiHubController<T> : Controller
        where T : Hub
    {
        private readonly IHubContext _hub;
        public IHubConnectionContext<dynamic> Clients { get; private set; }
        public IGroupManager Groups { get; private set; }

        /**
         * Purpose: Initialize with access to SignalR hub context, clients, and groups
         * Args:
         *      IConnectionManager signalRConnectionManager - Establishes the SignalR hub
         */
        protected ApiHubController(IConnectionManager signalRConnectionManager)
        {
            var _hub = signalRConnectionManager.GetHubContext<T>();
            Clients = _hub.Clients;
            Groups = _hub.Groups;
        }
    }
}
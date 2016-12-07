using System.Collections.Generic;

namespace Community.Models.OrganizationViewModels
{
    /**
     * Class: OrganizationUpcomingEventsViewModel
     * Purpose: Contains info about all of an organization's upcoming events and the attendees
     */
    public class OrganizationUpcomingEventsViewModel
    {
        public List<Dictionary<Event, List<EventMember>>> UpcomingEvents { get; set; }
    }
}

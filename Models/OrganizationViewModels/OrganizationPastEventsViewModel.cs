using System.Collections.Generic;

namespace Community.Models.OrganizationViewModels
{
    /**
     * Class: OrganizationPastEventsViewModel
     * Purpose: Contains info about all of an organization's past events and the attendees
     */
    public class OrganizationPastEventsViewModel
    {
        public List<Dictionary<Event, List<EventMember>>> PastEvents { get; set; }
    }
}

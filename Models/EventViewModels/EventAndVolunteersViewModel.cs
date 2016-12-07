using System.Collections.Generic;

namespace Community.Models.EventViewModels
{
    /**
     * Class: EventAndVolunteerViewModels
     * Purpose: Contains info about all of the EventMembers for an Event
     */
    public class EventAndVolunteerViewModels
    {
        public int EventId { get; set; }
        public List<EventMember> EventMembers { get; set; }
    }
}

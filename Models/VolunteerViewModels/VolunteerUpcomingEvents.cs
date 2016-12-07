using System.Collections.Generic;

namespace Community.Models.VolunteerViewModels
{
   /**
    * Class: VolunteerUpcomingEventsViewModel
    * Purpose: Contains information about the upcoming events for a user
    */
    public class VolunteerUpcomingEventsViewModel
    {
        public List<Event> UpcomingEvents { get; set; }
    }
}

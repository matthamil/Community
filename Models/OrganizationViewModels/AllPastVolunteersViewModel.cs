using System.Collections.Generic;

namespace Community.Models.OrganizationViewModels
{
   /**
    * Class: AllPastVolunteers
    * Purpose: Contains information about everyone who has volunteered at an organization's events
    */
    public class AllPastVolunteers
    {
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
        public int Count { get; set; }
        public List<ApplicationUser> PastVolunteers { get; set; }
    }
}

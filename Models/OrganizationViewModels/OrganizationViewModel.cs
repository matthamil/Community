using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.AccountViewModels;

namespace Community.Models.OrganizationViewModels
{
    /**
     * Class: OrganizationViewModel
     * Purpose: Organization information sent to client
     */
    public class OrganizationViewModel
    {
        public OrganizationViewModel() { }
        public OrganizationViewModel(Organization org)
        {
            OrganizationId = org.OrganizationId;
            Name = org.Name;
            Description = org.Description;
            City = org.City;
            State = org.State;
            IsActive = org.IsActive;
            Organizer = new ApplicationUserViewModel(org.Organizer);
            DateCreated = org.DateCreated;
        }
        public OrganizationViewModel(Organization org, ApplicationUserViewModel user)
        {
            OrganizationId = org.OrganizationId;
            Name = org.Name;
            Description = org.Description;
            City = org.City;
            State = org.State;
            IsActive = org.IsActive;
            Organizer = user;
            DateCreated = org.DateCreated;
        }
        public int OrganizationId { get; set; }

        public string Name { get; set; }

        [StringLength(255, ErrorMessage = "The organization description cannot exceed 255 characters. ")]
        public string Description { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public bool IsActive { get; set; }

        public ApplicationUserViewModel Organizer { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Data;
using Community.Models.AccountViewModels;
using Community.Models.EventMemberViewModels;
using Community.Models.OrganizationViewModels;

namespace Community.Models.EventViewModels
{
    /**
     * Class: EventViewModel
     * Purpose: Event information sent to client
     */
    public class EventViewModel
    {
        public EventViewModel() { }
        public EventViewModel(Event e)
        {
            EventId = e.EventId;
            Organization = new OrganizationViewModel(e.Organization);
            Name = e.Name;
            City = e.City;
            State = e.State;
            ZipCode = e.ZipCode;
            Date = e.Date;
            StartTime = e.StartTime;
            EndTime = e.EndTime;
            Description = e.Description;
            if (e.EventMembers != null)
            {
                foreach (EventMember eventMember in e.EventMembers)
                {
                    EventMembers.Add(new EventMemberViewModel(eventMember));
                }
            }
        }

        public int EventId { get; set; }

        public OrganizationViewModel Organization { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string ZipCode { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public string Description { get; set; }

        public List<EventMemberViewModel> EventMembers { get; set; }
    }
}
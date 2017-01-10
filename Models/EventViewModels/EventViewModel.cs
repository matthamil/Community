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
            Address = e.Address;
            ZipCode = e.ZipCode;
            Date = e.Date;
            Timestamp = e.Date.Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc)).TotalMilliseconds;
            StartTime = e.StartTime;
            EndTime = e.EndTime;
            Description = e.Description;
        }
        public EventViewModel(Event e, ICollection<EventMember> eMemberList)
        {
            EventId = e.EventId;
            Organization = new OrganizationViewModel(e.Organization);
            Name = e.Name;
            City = e.City;
            State = e.State;
            Address = e.Address;
            ZipCode = e.ZipCode;
            Date = e.Date;
            Timestamp = e.Date.Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc)).TotalMilliseconds;
            StartTime = e.StartTime;
            EndTime = e.EndTime;
            Description = e.Description;
            foreach (EventMember eventMember in eMemberList)
            {
                EventMembers.Add(new EventMemberViewModel(eventMember));
            }
        }

        public int EventId { get; set; }

        public OrganizationViewModel Organization { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string ZipCode { get; set; }

        public DateTime Date { get; set; }

        public double Timestamp { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Description { get; set; }

        public List<EventMemberViewModel> EventMembers { get; set; } = new List<EventMemberViewModel>();
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.AccountViewModels;
using Community.Models.EventViewModels;

namespace Community.Models.EventMemberViewModels
{
    /**
     * Class: EventMember
     * Purpose: Registered event volunteer
     */
    public class EventMemberViewModel
    {
        public EventMemberViewModel() { }
        public EventMemberViewModel(EventMember e)
        {
            EventMemberId = e.EventMemberId;
            if (e.ApplicationUser != null)
            {
                Volunteer = new ApplicationUserViewModel(e.ApplicationUser);
            }
            JobTitle = e.JobTitle;
            Description = e.Description;
            StartTime = e.StartTime;
            EndTime = e.EndTime;
            ChatMuted = e.ChatMuted;
            AttendeePoints = e.AttendeePoints;
        }

        public int EventMemberId { get; set; }

        public ApplicationUserViewModel Volunteer { get; set; }

        public string JobTitle { get; set; }

        public string Description { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public bool ChatMuted { get; set; }

        public int AttendeePoints { get; set; }
    }
}
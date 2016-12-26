using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.AccountViewModels;
using Community.Models.EventViewModels;

namespace Community.Models.EventMemberViewModels
{
    /**
     * Class: UserEventMemberViewModel
     * Purpose: Registered event volunteer
     */
    public class UserEventMemberViewModel
    {
        public UserEventMemberViewModel() { }
        public UserEventMemberViewModel(EventMember e)
        {
            Event = new EventViewModel(e.Event);
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

        public EventViewModel Event { get; set; }

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
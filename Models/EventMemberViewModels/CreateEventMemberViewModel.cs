using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.AccountViewModels;
using Community.Models.EventViewModels;

namespace Community.Models.EventMemberViewModels
{
    /**
     * Class: CreateEventMemberViewModel
     * Purpose: Create a new event member from the client
     */
    public class CreateEventMemberViewModel
    {
        public int EventId { get; set; }

        public string JobTitle { get; set; }

        public string Description { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public bool ChatMuted { get; set; }

        public int AttendeePoints { get; set; }
    }
}
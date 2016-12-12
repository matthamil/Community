using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.AccountViewModels;
using Community.Models.EventViewModels;

namespace Community.Models.EventMemberViewModels
{
    /**
     * Class: EditEventMemberViewModel
     * Purpose: Edit an existing event member from the client
     */
    public class EditEventMemberViewModel
    {
        [Required]
        public string JobTitle { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public bool ChatMuted { get; set; }

        [Required]
        public int AttendeePoints { get; set; }
    }
}
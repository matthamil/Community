using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models.EventChatroomMessageViewModels
{
    /**
     * Class: CreateEventChatroomMessage
     * Purpose: Message sent by client in the event chatroom
     */
    public class CreateEventChatroomMessageViewModel
    {
        [Required]
        public int EventMemberId { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message is longer than 1000 characters.")]
        public string Message { get; set; }
    }
}
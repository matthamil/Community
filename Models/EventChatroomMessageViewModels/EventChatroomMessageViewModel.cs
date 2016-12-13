using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Community.Models.EventMemberViewModels;

namespace Community.Models.EventChatroomMessageViewModels
{
    /**
     * Class: EventChatroomMessage
     * Purpose: Message sent to the client in the event chatroom
     */
    public class EventChatroomMessageViewModel
    {
        public EventChatroomMessageViewModel() { }
        public EventChatroomMessageViewModel(EventChatroomMessage message)
        {
            EventChatroomMessageId = message.EventChatroomMessageId;
            EventMember = new EventMemberViewModel(message.EventMember);
            Message = message.Message;
            Timestamp = message.DateCreated;
        }
        [Required]
        public EventMemberViewModel EventMember { get; set; }

        public int EventChatroomMessageId { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message length must be between 1 and 1000 characters.")]
        public string Message { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [DataType(DataType.Date)]
        public DateTime? LastModified { get; set; }
    }
}
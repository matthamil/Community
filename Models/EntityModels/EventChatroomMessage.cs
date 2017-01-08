using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    /**
     * Class: EventChatroomMessage
     * Purpose: Message sent by an event member or event organizer in the event chatroom
     */
    public class EventChatroomMessage
    {
        [Key]
        public int EventChatroomMessageId { get; set; }

        public EventMember EventMember { get; set; }

        [Required]
        public string Message { get; set; }

        [DataType(DataType.Date)]
        public DateTime? LastModified { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
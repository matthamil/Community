using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    public class EventChatroomMessage
    {
        [Key]
        public int EventChatroomMessageId { get; set; }

        [Required]
        public int EventMemberId { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message is longer than 1000 characters.")]
        public string Message { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
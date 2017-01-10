using System.ComponentModel.DataAnnotations;

namespace Community.Models.EventChatroomMessageViewModels
{
    /**
     * Class: EditEventChatroomMessage
     * Purpose: Edited message sent by the client in the event chatroom
     */
    public class EditEventChatroomMessageViewModel
    {
        [Required]
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Message length must be between 1 and 1000 characters.")]
        public string Message { get; set; }
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    /**
     * Class: EventMember
     * Purpose: Registered event volunteer
     */
    public class EventMember
    {
        [Key]
        public int EventMemberId { get; set; }

        public string VolunteerId { get; set; }
        public ApplicationUser Volunteer { get; set; }

        [Required]
        public string JobTitle { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The organization description cannot exceed 255 characters. ")]
        public string Description { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public bool ChatMuted { get; set; }

        public int AttendeePoints { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
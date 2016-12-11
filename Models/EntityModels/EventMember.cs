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

        [ForeignKey("Event")]
        public int EventId { get; set; }

        [Required]
        public Event Event { get; set; }

        [ForeignKey("Volunteer")]
        public string VolunteerId { get; set; }

        public ApplicationUser Volunteer { get; set; }

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

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
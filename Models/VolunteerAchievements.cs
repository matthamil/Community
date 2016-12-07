using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    public class VolunteerAchievements
    {
        [Key]
        public int VolunteerAchievementsId { get; set; }

        [Required]
        public int VolunteerId { get; set; }

        [Required]
        public int AchievementId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
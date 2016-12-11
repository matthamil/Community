using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    /**
     * Class: VolunteerAchievements
     * Purpose: Achievement associated with a volunteer
     */
    public class VolunteerAchievements
    {
        [Key]
        public int VolunteerAchievementsId { get; set; }

        [Required]
        public ApplicationUser Volunteer { get; set; }

        [Required]
        public Achievement Achievement { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    /**
     * Class: Achievement
     * Purpose: Stores information about an achievement
     */
    public class Achievement
    {
        [Key]
        public int AchievementId { get; set; }

        [Required]
        public string Metric { get; set; }

        [Required]
        public int Points { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
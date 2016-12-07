using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    public class Achievements
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
        public DateTime DateEarned { get; set; }
    }
}
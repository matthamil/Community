using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    public class Organization
    {
        [Key]
        public int OrganizationId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The organization description cannot exceed 255 characters. ")]
        public string Description { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
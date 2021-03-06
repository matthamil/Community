using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models
{
    /**
     * Class: Organization
     * Purpose: Organization created by a user
     */
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
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public ApplicationUser Organizer { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}
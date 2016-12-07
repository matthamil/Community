using System.ComponentModel.DataAnnotations;

namespace Community.Models
{
    public class Organization
    {
        [Required]
        public int OrganizationId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "The organization description cannot exceed 255 characters. ")]
        public string Description { get; set; }
    }
}
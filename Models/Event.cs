using System;
using System.ComponentModel.DataAnnotations;

namespace Community.Models
{
    public class Event
    {
        [Required]
        public int OrganizationId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public int ZipCode { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        [StringLength(255, ErrorMessage = "The organization description cannot exceed 255 characters. ")]
        public string Description { get; set; }
    }
}
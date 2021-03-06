using System;
using System.ComponentModel.DataAnnotations;

namespace Community.Models.EventViewModels
{
    /**
     * Class: CreateEventViewModel
     * Purpose: Create a new event from the client
     */
    public class CreateEventViewModel
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
        public string ZipCode { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
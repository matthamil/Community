using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models.OrganizationViewModels
{
    /**
     * Class: OrganizationViewModel
     * Purpose: Used when creating a new organization via POST
     */
    public class OrganizationCreateViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }
    }
}
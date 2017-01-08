using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Community.Models.OrganizationViewModels
{
    /**
     * Class: EditOrganizationViewModel
     * Purpose: Used when editing an existing organization via PATCH
     */
    public class EditOrganizationViewModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string City { get; set; }

        public string State { get; set; }
    }
}
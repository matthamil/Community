using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Community.Models
{
    /**
     * Class: ApplicationUser
     * Purpose: User class
     */
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public int ZipCode { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime DateCreated { get; set; }
    }
}

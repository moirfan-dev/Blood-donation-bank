using System.ComponentModel.DataAnnotations;

namespace Blood_Donation_Bank.model
{
    public class BloodDonor
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public required string FullName { get; set; }

        [Required]
        [StringLength(15)]
        public required string Mobile { get; set; }

        [Required]
        [EmailAddress]
        public required string  Email { get; set; }

        [Required]
        [StringLength(3)]
        public required string BloodGroup { get; set; }

        [Required]
        [StringLength(100)]
        public required string City { get; set; }

        [Required]
        [StringLength(100)]
        public required string Country { get; set; }

        [Required]
        [StringLength(100)]
        public required string State { get; set; }

        [Required]
        public int Age { get; set; }

    }
}

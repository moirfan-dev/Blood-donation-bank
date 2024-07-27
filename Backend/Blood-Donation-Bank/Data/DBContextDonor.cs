using Blood_Donation_Bank.model;
using Microsoft.EntityFrameworkCore;


namespace Blood_Donation_Bank.Data
{
    public class DBContextDonor : DbContext
    {
        public DBContextDonor(DbContextOptions<DBContextDonor> options) : base(options)
        {
        }

        public DbSet<BloodDonor> BloodDonors { get; set; }
    }
}

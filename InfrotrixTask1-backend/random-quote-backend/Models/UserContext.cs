using Microsoft.EntityFrameworkCore;


namespace random_quote_backend.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext>options):base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}

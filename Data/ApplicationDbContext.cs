using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Community.Models;

namespace Community.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Achievement> Achievement { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<EventChatroomMessage> EventChatroomMessage { get; set; }
        public DbSet<EventMember> EventMember { get; set; }
        public DbSet<Organization> Organization { get; set; }
        public DbSet<VolunteerAchievements> VolunteerAchievements { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            //modelBuilder.Entity<Product>()
            //   .Property(b => b.DateCreated)
            //   .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<Achievement>()
                .Property(a => a.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<ApplicationUser>()
                .Property(a => a.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<Event>()
                .Property(e => e.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<EventChatroomMessage>()
                .Property(e => e.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<EventMember>()
                .Property(e => e.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<Organization>()
                .Property(o => o.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");

            builder.Entity<VolunteerAchievements>()
                .Property(v => v.DateCreated)
                .HasDefaultValueSql("strftime('%Y-%m-%d %H:%M:%S')");
        }
    }
}

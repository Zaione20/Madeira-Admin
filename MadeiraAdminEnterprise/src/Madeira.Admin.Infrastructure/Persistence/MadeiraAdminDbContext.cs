using Microsoft.EntityFrameworkCore;
using Madeira.Admin.Domain.Entities;

namespace Madeira.Admin.Infrastructure.Persistence
{
    public class MadeiraAdminDbContext : DbContext
    {
        public MadeiraAdminDbContext(DbContextOptions<MadeiraAdminDbContext> options)
            : base(options)
        {
        }

        public DbSet<Member> Members { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Additional model configuration can be done here
        }
    }
}
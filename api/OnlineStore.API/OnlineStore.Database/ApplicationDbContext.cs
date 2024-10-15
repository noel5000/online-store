using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineStore.Data;

namespace OnlineStore.Database
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Subscription> Subscriptions { get; set; }
        public virtual DbSet<SubscriptionPayment> SubscriptionPayments { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<InvoiceSupportMessage> InvoiceSupportMessages { get; set; }
        public virtual DbSet<CustomerSupportMessage> CustomerSupportMessages { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Subscription>().HasKey(x => x.Id);
            builder.Entity<Invoice>().HasKey(x => x.Id);
            builder.Entity<Product>().HasKey(x => x.Id);
            builder.Entity<SubscriptionPayment>().HasKey(x => x.Id);
            builder.Entity<Subscription>()
                .HasMany(s => s.Payments)
                .WithOne(p => p.Subscription)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Subscription>()
                .HasOne(s=>s.Product)
                .WithMany(p=>p.Subscriptions)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<CustomerSupportMessage>()
                .HasOne(s => s.User)
                .WithMany(p => p.Messages)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<InvoiceSupportMessage>()
                .HasOne(s => s.Invoice)
                .WithMany(p => p.Messages)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(p => p.Subscriptions)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Invoice>()
                .HasOne(s => s.Product)
                .WithMany(p => p.Invoices)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Invoice>()
                .HasOne(s => s.User)
                .WithMany(p => p.Invoices)
                .OnDelete(DeleteBehavior.Restrict);
            base.OnModelCreating(builder);
        }

    }
}

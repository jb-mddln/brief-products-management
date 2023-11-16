using Api.ProductsManagement.Data.Context.Contract;
using Api.ProductsManagement.Data.Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace Api.ProductsManagement.Data.Context
{
    public partial class ProductsManagementDbContext : DbContext, IProductsManagementDbContext
    {
        public ProductsManagementDbContext()
        {
        }

        public ProductsManagementDbContext(DbContextOptions<ProductsManagementDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<ProductsCategory> ProductsCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("products_pkey");

                entity.ToTable("products");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .HasColumnName("description");
                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image");
                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
                entity.Property(e => e.Price)
                    .HasPrecision(15, 2)
                    .HasColumnName("price");
                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.HasMany(d => d.Categories).WithMany(p => p.Products)
                    .UsingEntity<Dictionary<string, object>>(
                        "ProductsCategoriesAssociation",
                        r => r.HasOne<ProductsCategory>().WithMany()
                            .HasForeignKey("Categoryid")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("products_categories_association_categoryid_fkey"),
                        l => l.HasOne<Product>().WithMany()
                            .HasForeignKey("Productid")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("products_categories_association_productid_fkey"),
                        j =>
                        {
                            j.HasKey("Productid", "Categoryid").HasName("products_categories_association_pkey");
                            j.ToTable("products_categories_association");
                            j.IndexerProperty<int>("Productid").HasColumnName("productid");
                            j.IndexerProperty<int>("Categoryid").HasColumnName("categoryid");
                        });
            });

            modelBuilder.Entity<ProductsCategory>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("products_categories_pkey");

                entity.ToTable("products_categories");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .HasColumnName("description");
                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image");
                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
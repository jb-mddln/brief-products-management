using Api.ProductsManagement.Data.Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace Api.ProductsManagement.Data.Context.Contract
{
    public interface IProductsManagementDbContext : IDbContext
    {
        DbSet<Product> Products { get; set; }

        DbSet<ProductsCategory> ProductsCategories { get; set; }
    }
}
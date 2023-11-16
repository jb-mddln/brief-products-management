using Api.ProductsManagement.Data.Context.Contract;
using Api.ProductsManagement.Data.Entity.Model;

namespace Api.ProductsManagement.Data.Repository
{
    public class ProductRepository : Repository<Product>
    {
        public ProductRepository(IProductsManagementDbContext dbContext) : base(dbContext)
        {
        }
    }
}

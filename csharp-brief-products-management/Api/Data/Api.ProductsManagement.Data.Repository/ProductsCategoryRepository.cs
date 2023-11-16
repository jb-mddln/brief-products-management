using Api.ProductsManagement.Data.Context.Contract;
using Api.ProductsManagement.Data.Entity.Model;

namespace Api.ProductsManagement.Data.Repository
{
    public class ProductsCategoryRepository : Repository<ProductsCategory>
    {
        public ProductsCategoryRepository(IProductsManagementDbContext dbContext) : base(dbContext)
        {
        }
    }
}

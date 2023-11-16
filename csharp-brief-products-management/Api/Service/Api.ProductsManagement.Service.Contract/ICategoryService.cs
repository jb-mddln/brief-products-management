using Api.ProductsManagement.Service.DTO;

namespace Api.ProductsManagement.Service.Contract
{
    public interface ICategoryService
    {
        Task<IEnumerable<ReadCategoryDTO>> GetCategoriesAsync();

        Task<IEnumerable<ReadCategoryDTO>> GetCategoriesByIds(IEnumerable<int> ids);
    }
}
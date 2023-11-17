using Api.ProductsManagement.Service.DTO;

namespace Api.ProductsManagement.Service.Contract
{
    public interface IProductService
    {
        Task<IEnumerable<ReadProductDTO>> GetProductsAsync();

        Task<ReadProductDTO> GetProductByIdAsync(int id);

        Task<ReadProductDTO> AddProductAsync(CreateProductDTO productDTO);

        Task<ReadProductDTO> RemoveProductAsync(int id);
    }
}
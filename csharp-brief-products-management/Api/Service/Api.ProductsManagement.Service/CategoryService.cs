using Api.ProductsManagement.Data.Entity.Model;
using Api.ProductsManagement.Data.Repository.Contract;
using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.DTO;
using AutoMapper;

namespace Api.ProductsManagement.Service
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<ProductsCategory> _productsCategoryRepository;

        private readonly IMapper _mapper;

        public CategoryService(IRepository<ProductsCategory> productsCategoryRepository, IMapper mapper)
        {
            _productsCategoryRepository = productsCategoryRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadCategoryDTO>> GetCategoriesAsync()
        {
            var categories = await _productsCategoryRepository.GetAll(category => category.Products).ConfigureAwait(false);
            return _mapper.Map<IEnumerable<ReadCategoryDTO>>(categories);
        }

        public async Task<ReadCategoryDTO> GetCategoryByIdAsync(int id)
        {
            var category = await _productsCategoryRepository.GetById(id, category => category.Products).ConfigureAwait(false);
            if (category == null)
            {
                throw new Exception($"Category {id} not found.");
            }

            return _mapper.Map<ReadCategoryDTO>(category);
        }

        public async Task<IEnumerable<ReadCategoryDTO>> GetCategoriesByIds(IEnumerable<int> ids)
        {
            var categories = await _productsCategoryRepository.GetByIds(ids).ConfigureAwait(false);
            return _mapper.Map<IEnumerable<ReadCategoryDTO>>(categories);
        }
    }
}
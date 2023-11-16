using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Api.ProductsManagement.Application.Controllers
{
    [Route("api/categories"), ApiController, Produces("application/json")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Handle get request for retrieving all the categories
        /// </summary>
        /// <returns></returns>
        [HttpGet, ProducesResponseType(typeof(IEnumerable<ReadCategoryDTO>), 200)]
        public async Task<ActionResult> GetCategoriesAsync() => Ok(await _categoryService.GetCategoriesAsync());
    }
}

using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Api.ProductsManagement.Application.Controllers
{
    [Route("api/products"), ApiController, Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// Handle GET request for retrieving all the products
        /// </summary>
        /// <returns></returns>
        [HttpGet, ProducesResponseType(typeof(IEnumerable<ReadProductDTO>), 200)]
        public async Task<ActionResult> GetProductsAsync() => Ok(await _productService.GetProductsAsync());

        /// <summary>
        /// Handle the GET request with parameters to retrieve a product by its Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}"), ProducesResponseType(typeof(ReadProductDTO), 200)]
        public async Task<ActionResult> GetProduct(int id) => Ok(await _productService.GetProductByIdAsync(id));
    }
}

using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

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

        /// <summary>
        /// Handle POST request for creating a new product
        /// </summary>
        /// <param name="productDTO"></param>
        /// <returns></returns>
        [HttpPost, ProducesResponseType(typeof(ReadProductDTO), 201)]
        public async Task<ActionResult> Post([FromBody][BindNever] CreateProductDTO productDTO) => Ok(await _productService.AddProductAsync(productDTO).ConfigureAwait(false));
        
        /// <summary>
        /// Handle DELETE request for deleting a product by its id
        /// </summary>
        /// <param name="id">product id</param>
        /// <returns></returns>
        [HttpDelete("{id}"), ProducesResponseType(typeof(ReadProductDTO), 200)]
        public async Task<ActionResult> Delete(int id) => Ok(await _productService.RemoveProductAsync(id).ConfigureAwait(false));
    }
}
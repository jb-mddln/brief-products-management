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
        /// Handle get request for retrieving all the products
        /// </summary>
        /// <returns></returns>
        [HttpGet, ProducesResponseType(typeof(IEnumerable<ReadProductDTO>), 200)]
        public async Task<ActionResult> GetProductsAsync() => Ok(await _productService.GetProductsAsync());
    }
}

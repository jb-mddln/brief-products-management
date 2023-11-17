using System.ComponentModel.DataAnnotations;

namespace Api.ProductsManagement.Service.DTO
{
    public class CreateProductDTO
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public byte[]? Image { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Stock { get; set; }

        public IEnumerable<int> CategoriesIds { get; set; }
    }
}
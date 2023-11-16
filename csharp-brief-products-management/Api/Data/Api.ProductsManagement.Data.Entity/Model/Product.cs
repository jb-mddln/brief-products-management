using System.ComponentModel.DataAnnotations;

namespace Api.ProductsManagement.Data.Entity.Model
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        public string? Image { get; set; }

        public decimal Price { get; set; }

        public int Stock { get; set; }

        public virtual ICollection<ProductsCategory> Categories { get; set; } = new List<ProductsCategory>();
    }
}
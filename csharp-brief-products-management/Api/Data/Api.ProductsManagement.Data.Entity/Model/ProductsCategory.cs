using System.ComponentModel.DataAnnotations;

namespace Api.ProductsManagement.Data.Entity.Model;

public class ProductsCategory
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}

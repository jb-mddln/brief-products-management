namespace Api.ProductsManagement.Service.DTO
{
    public class ReadCategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public IEnumerable<int> ProductsIds { get; set; }
    }
}

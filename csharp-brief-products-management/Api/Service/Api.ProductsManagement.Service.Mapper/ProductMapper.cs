using Api.ProductsManagement.Data.Entity.Model;
using Api.ProductsManagement.Service.DTO;
using AutoMapper;

namespace Api.ProductsManagement.Service.Mapper
{
    public class ProductMapper : Profile
    {
        public ProductMapper()
        {
            CreateMap<Product, CreateProductDTO>().ReverseMap();

            CreateMap<Product, ReadProductDTO>()
                .ForMember(dto => dto.CategoriesIds, opt => opt.MapFrom(product => product.Categories.Select(category => category.Id)));
        }
    }
}
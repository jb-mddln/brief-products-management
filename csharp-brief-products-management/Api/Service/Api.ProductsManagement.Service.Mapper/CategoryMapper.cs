using Api.ProductsManagement.Data.Entity.Model;
using Api.ProductsManagement.Service.DTO;
using AutoMapper;

namespace Api.ProductsManagement.Service.Mapper
{
    public class CategoryMapper : Profile
    {
        public CategoryMapper()
        {
            CreateMap<ProductsCategory, CreateCategoryDTO>().ReverseMap();
            CreateMap<ProductsCategory, ReadCategoryDTO>().ForMember(dto => dto.ProductsIds, opt => opt.MapFrom(category => category.Products.Select(product => product.Id))).ReverseMap();
        }
    }
}

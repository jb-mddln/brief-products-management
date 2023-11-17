﻿using Api.ProductsManagement.Data.Entity.Model;
using Api.ProductsManagement.Data.Repository.Contract;
using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.DTO;
using AutoMapper;

namespace Api.ProductsManagement.Service
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;

        private readonly IMapper _mapper;

        public ProductService(IRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadProductDTO>> GetProductsAsync()
        {
            var products = await _productRepository.GetAll(product => product.Categories).ConfigureAwait(false);
            return _mapper.Map<IEnumerable<ReadProductDTO>>(products);
        }

        public async Task<ReadProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetById(id, product => product.Categories).ConfigureAwait(false);
            if (product == null)
            {
                throw new Exception($"Product {id} not found.");
            }

            return _mapper.Map<ReadProductDTO>(product);
        }
    }
}
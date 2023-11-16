
using Api.ProductsManagement.Data.Context;
using Api.ProductsManagement.Data.Context.Contract;
using Api.ProductsManagement.Data.Entity.Model;
using Api.ProductsManagement.Data.Repository;
using Api.ProductsManagement.Data.Repository.Contract;
using Api.ProductsManagement.Service;
using Api.ProductsManagement.Service.Contract;
using Api.ProductsManagement.Service.Mapper;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Api.ProductsManagement.Application
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("DatabaseConnection");

            builder.Services.AddDbContext<IProductsManagementDbContext, ProductsManagementDbContext>(options =>
                options.UseNpgsql(connectionString)
                    .LogTo(Console.WriteLine, LogLevel.Information)
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors());

            builder.Services.AddAutoMapper(Assembly.Load("Api.ProductsManagement.Service.Mapper"));

            builder.Services.AddScoped<IRepository<Product>, ProductRepository>();
            builder.Services.AddScoped<IRepository<ProductsCategory>, ProductsCategoryRepository>();

            builder.Services.AddScoped<IProductService, ProductService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAll");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
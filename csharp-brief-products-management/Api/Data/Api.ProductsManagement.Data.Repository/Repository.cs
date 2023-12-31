﻿using Api.ProductsManagement.Data.Context.Contract;
using Api.ProductsManagement.Data.Repository.Contract;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Reflection;

namespace Api.ProductsManagement.Data.Repository
{
    /// <summary>
    /// Base class for all our repository
    /// </summary>
    /// <typeparam name="T">Entity</typeparam>
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly IProductsManagementDbContext _dbContext;

        protected DbSet<T> Entities => _dbContext.Set<T>();

        protected Repository(IProductsManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Return all the entities of type T, can pass Include with the includes parameter eg: 'GetAll(client => client.Address)'
        /// </summary>
        /// <returns>List of entities of type T</returns>
        public async Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            var query = Entities.AsQueryable();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.ToListAsync().ConfigureAwait(false);
        }

        /// <summary>
        /// Return null or the entity of type T with the corresponding Id, can pass Include with the includes parameter eg: 'GetById(1, client => client.Address)'
        /// </summary>
        /// <param name="id">Id of the entity</param>
        /// <returns>Entity of type T</returns>
        /// <exception cref="InvalidOperationException">Throw InvalidOperationException if entity of type T does not have a property with a Key attribute</exception>
        public async Task<T?> GetById(int id, params Expression<Func<T, object>>[] includes)
        {
            var idProperty = typeof(T).GetProperties()
                .FirstOrDefault(x => x.GetCustomAttribute<KeyAttribute>() != null);
            if (idProperty == null)
            {
                throw new InvalidOperationException($"Entity {typeof(T)} does not have an [Key] attribute on one property.");
            }

            var parameter = Expression.Parameter(typeof(T), "entity");
            var property = Expression.Property(parameter, idProperty);
            var equality = Expression.Equal(property, Expression.Constant(id));

            var lambda = Expression.Lambda<Func<T, bool>>(equality, parameter);

            var query = Entities.AsQueryable();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(lambda).ConfigureAwait(false);
        }

        public async Task<IEnumerable<T>> GetByIds(IEnumerable<int> ids, params Expression<Func<T, object>>[] includes)
        {
            var idProperty = typeof(T).GetProperties()
                .FirstOrDefault(x => x.GetCustomAttribute<KeyAttribute>() != null);

            if (idProperty == null)
            {
                throw new InvalidOperationException($"Entity {typeof(T)} does not have an [Key] attribute on one property.");
            }

            var query = Entities.AsQueryable();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            query = query.Where(entity => ids.Contains((int)idProperty.GetValue(entity)));

            return await query.ToListAsync().ConfigureAwait(false);
        }


        public async Task<T?> GetBy(string fieldName, object fieldValue, params Expression<Func<T, object>>[] includes)
        {
            var property = typeof(T).GetProperties()
                .FirstOrDefault(x => x.Name.Equals(fieldName, StringComparison.OrdinalIgnoreCase));

            if (property == null)
            {
                throw new InvalidOperationException($"Entity {typeof(T)} does not have a property with the name '{fieldName}'.");
            }

            var parameter = Expression.Parameter(typeof(T), "entity");
            var propertyExpression = Expression.Property(parameter, property);
            var equality = Expression.Equal(propertyExpression, Expression.Constant(fieldValue));

            var lambda = Expression.Lambda<Func<T, bool>>(equality, parameter);

            var query = Entities.AsQueryable();
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(lambda).ConfigureAwait(false);
        }

        /// <summary>
        /// Add entity of type T to the database
        /// </summary>
        /// <param name="entity">Entity of type T</param>
        /// <returns>Entity of type T</returns>
        /// <exception cref="InvalidOperationException"></exception>
        public async Task<T> Add(T entity)
        {
            // should not happen ?
            if (entity.GetType() != typeof(T))
            {
                throw new InvalidOperationException("Invalid entity type");
            }

            var elementAdded = await Entities.AddAsync(entity).ConfigureAwait(false);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);

            return elementAdded.Entity;
        }

        /// <summary>
        /// Update entity of type T from the database
        /// </summary>
        /// <param name="entity">Entity of type T</param>
        /// <returns>Entity of type T</returns>
        public async Task<T> Update(T entity)
        {
            var elementUpdated = Entities.Update(entity);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);

            return elementUpdated.Entity;
        }

        /// <summary>
        /// Remove entity of type T from the database
        /// </summary>
        /// <param name="entity">Entity of type T</param>
        /// <returns>Entity of type T</returns>
        public async Task<T> Remove(T entity)
        {
            var elementDeleted = Entities.Remove(entity);
            await _dbContext.SaveChangesAsync().ConfigureAwait(false);

            return elementDeleted.Entity;
        }
    }
}
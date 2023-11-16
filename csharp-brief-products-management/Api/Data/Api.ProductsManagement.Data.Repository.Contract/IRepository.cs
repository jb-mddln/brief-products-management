using System.Linq.Expressions;

namespace Api.ProductsManagement.Data.Repository.Contract
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes);

        Task<T?> GetById(int id, params Expression<Func<T, object>>[] includes);

        Task<IEnumerable<T>> GetByIds(IEnumerable<int> ids, params Expression<Func<T, object>>[] includes);

        Task<T?> GetBy(string fieldName, object fieldValue, params Expression<Func<T, object>>[] includes);

        Task<T> Add(T entity);

        Task<T> Update(T entity);

        Task<T> Remove(T entity);
    }
}
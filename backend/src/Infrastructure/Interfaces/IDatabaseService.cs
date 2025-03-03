using System.Data.Common;

namespace TodoBack.Infrastructure.Interfaces
{
    /// <summary>
    /// Serviço responsável por fornecer conexões com o banco de dados.
    /// </summary>
    public interface IDatabaseService
    {
        /// <summary>
        /// Retorna uma nova instância de DbConnection.
        /// </summary>
        /// <returns>Instância de DbConnection</returns>
        DbConnection GetConnection();
    }
}
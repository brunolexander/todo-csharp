using Microsoft.Data.SqlClient;
using TodoBack.Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Data.Common;

namespace TodoBack.Infrastructure.Services
{
    /// <summary>
    /// Implementação do serviço de banco de dados.
    /// </summary>
    /// <remarks>
    /// Inicializa o serviço de banco de dados com a string de conexão obtida da configuração.
    /// </remarks>
    /// <param name="config">Configuração da aplicação.</param>
    /// <exception cref="ArgumentException">Lançado se a string de conexão for nula ou vazia.</exception>
    public class DatabaseService(IConfiguration configuracao) : IDatabaseService
    {
        private readonly string _connectionString = configuracao.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuracao), "A string de conexão não pode ser nula ou vazia.");

        /// <summary>
        /// Cria e retorna uma nova instância de DbConnection.
        /// </summary>
        /// <returns>Instância de DbConnection configurada.</returns>
        public DbConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
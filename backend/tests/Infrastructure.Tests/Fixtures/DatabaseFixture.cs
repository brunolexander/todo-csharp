using System.Data.Common;
using Microsoft.Data.SqlClient;
using TodoBack.Infrastructure.Interfaces;

namespace TodoBack.Infrastructure.Tests.Fixtures
{
    /// <summary>
    /// Fixture para gerenciar a conexão com o banco de dados de teste.
    /// </summary>
    public class DatabaseFixture : IDisposable, IDatabaseService
    {
        private string _ConnectionString;

        /// <summary>
        /// Inicializa a fixture criando uma conexão única para ser reutilizada nos testes.
        /// </summary>
        public DatabaseFixture()
        {
            _ConnectionString = Environment.GetEnvironmentVariable("ConnectionStrings__TestsConnection")
                    ?? throw new ArgumentNullException(nameof(_ConnectionString), "A string de conexão não pode ser nula ou vazia.");
        }

        /// <summary>
        /// Retorna a conexão ativa do banco de dados.
        /// </summary>
        public DbConnection GetConnection() => new SqlConnection(_ConnectionString);

        /// <summary>
        /// Fecha a conexão ao finalizar os testes.
        /// </summary>
        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}

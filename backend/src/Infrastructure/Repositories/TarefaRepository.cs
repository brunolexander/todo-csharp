using Dapper;
using TodoBack.Domain.Entities;
using TodoBack.Infrastructure.Interfaces;

namespace TodoBack.Infrastructure.Repositories
{
    /// <summary>
    /// Repositório responsável por gerenciar operações no banco de dados para a entidade Tarefa.
    /// </summary>
    /// <remarks>
    /// Inicializa uma nova instância do repositório de tarefas.
    /// </remarks>
    /// <param name="databaseService">Serviço responsável por fornecer conexões com o banco de dados.</param>
    public class TarefaRepository(IDatabaseService databaseService) : ITarefaRepository
    {
        private readonly IDatabaseService _databaseService = databaseService;

        /// <summary>
        /// Obtém todas as tarefas do banco de dados.
        /// </summary>
        /// <returns>Uma coleção de tarefas.</returns>
        public async Task<IEnumerable<Tarefa>> ObterTodas()
        {
            using var conexao = _databaseService.GetConnection();
            return await conexao.QueryAsync<Tarefa>("SELECT * FROM Tarefas");
        }

        /// <summary>
        /// Obtém uma tarefa pelo ID.
        /// </summary>
        /// <param name="id">ID da tarefa.</param>
        /// <returns>Uma instância de <see cref="Tarefa"/> ou null se não encontrada.</returns>
        public async Task<Tarefa?> ObterPorId(int id)
        {
            using var conexao = _databaseService.GetConnection();
            return await conexao.QueryFirstOrDefaultAsync<Tarefa>(
                "SELECT * FROM Tarefas WHERE Id = @Id", 
                new { Id = id }
            );
        }

        /// <summary>
        /// Obtém todas as tarefas com um status específico.
        /// </summary>
        /// <param name="status">Status das tarefas a serem obtidas.</param>
        /// <returns>Uma coleção de tarefas com o status especificado.</returns>
        public async Task<IEnumerable<Tarefa>> ObterPorStatus(Status status)
        {
            using var conexao = _databaseService.GetConnection();
            return await conexao.QueryAsync<Tarefa>(
                "SELECT * FROM Tarefas WHERE Status = @Status", 
                new { Status = status.ToString() }
            );
        }

        /// <summary>
        /// Adiciona uma nova tarefa ao banco de dados.
        /// </summary>
        /// <param name="tarefa">Tarefa a ser adicionada.</param>
        public async Task<Tarefa> Adicionar(Tarefa tarefa)
        {
            using var conexao = _databaseService.GetConnection();

            var query = """
                INSERT INTO Tarefas 
                (Titulo, Descricao, DataCriacao, DataConclusao, Status) 
                OUTPUT INSERTED.*
                VALUES 
                (@Titulo, @Descricao, @DataCriacao, @DataConclusao, @Status)
            """;

            var parameters = new
            {
                tarefa.Titulo,
                tarefa.Descricao,
                tarefa.DataCriacao,
                tarefa.DataConclusao,
                Status = tarefa.Status.ToString()
            };

            return await conexao.QuerySingleAsync<Tarefa>(query, parameters);
        }

        /// <summary>
        /// Atualiza os dados de uma tarefa existente.
        /// </summary>
        /// <param name="tarefa">Tarefa com os novos dados.</param>
        public async Task<Tarefa> Atualizar(Tarefa tarefa)
        {
            using var conexao = _databaseService.GetConnection();
            
            var query = """
                UPDATE Tarefas 
                SET Titulo = @Titulo, 
                    Descricao = @Descricao, 
                    DataCriacao = @DataCriacao, 
                    DataConclusao = @DataConclusao, 
                    Status = @Status
                OUTPUT INSERTED.*
                WHERE Id = @Id
            """;

            var parameters = new
            {
                tarefa.Id,
                tarefa.Titulo,
                tarefa.Descricao,
                tarefa.DataCriacao,
                tarefa.DataConclusao,
                Status = tarefa.Status.ToString()
            };

            return await conexao.QuerySingleAsync<Tarefa>(query, parameters);
        }

        /// <summary>
        /// Remove uma tarefa com base no ID.
        /// </summary>
        /// <param name="id">ID da tarefa a ser removida.</param>
        public async Task Remover(int id)
        {
            using var conexao = _databaseService.GetConnection();
            await conexao.ExecuteAsync("DELETE FROM Tarefas WHERE Id = @Id", new { Id = id });
        }
    }
}
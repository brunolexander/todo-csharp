using TodoBack.Domain.Entities;

namespace TodoBack.Application.Interfaces
{
    /// <summary>
    /// Interface para o serviço de tarefas.
    /// </summary>
    public interface ITarefaService
    {
        /// <summary>
        /// Obtém todas as tarefas.
        /// </summary>
        /// <returns>Uma lista de tarefas.</returns>
        Task<IEnumerable<Tarefa>> ObterTodas();

        /// <summary>
        /// Obtém uma tarefa pelo seu ID.
        /// </summary>
        /// <param name="id">O ID da tarefa.</param>
        /// <returns>A tarefa encontrada ou null se não existir.</returns>
        Task<Tarefa?> ObterPorId(int id);

        /// <summary>
        /// Obtém todas as tarefas pelo status.
        /// </summary>
        /// <param name="status">O status das tarefas.</param>
        /// <returns>Uma lista de tarefas com o status especificado.</returns>
        Task<IEnumerable<Tarefa>> ObterPorStatus(Status status);

        /// <summary>
        /// Adiciona uma nova tarefa.
        /// </summary>
        /// <param name="tarefa">A tarefa a ser adicionada.</param>
        Task<Tarefa> Adicionar(Tarefa tarefa);

        /// <summary>
        /// Atualiza uma tarefa existente.
        /// </summary>
        /// <param name="tarefa">A tarefa com os dados atualizados.</param>
        Task<Tarefa> Atualizar(Tarefa tarefa);

        /// <summary>
        /// Remove uma tarefa pelo seu ID.
        /// </summary>
        /// <param name="id">O ID da tarefa a ser removida.</param>
        Task Remover(int id);

        /// <summary>
        /// Salva a ordenação de uma lista de tarefas.
        /// </summary>
        /// <param name="ordenacoes">A lista de ordenações de tarefas a serem salvas.</param>
        Task SalvarOrdenacao(List<OrdenacaoTarefa> ordenacoes);
    }
}
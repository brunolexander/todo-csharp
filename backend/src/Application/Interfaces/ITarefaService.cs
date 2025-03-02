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
        IEnumerable<Tarefa> ObterTodas();

        /// <summary>
        /// Obtém uma tarefa pelo seu ID.
        /// </summary>
        /// <param name="id">O ID da tarefa.</param>
        /// <returns>A tarefa encontrada ou null se não existir.</returns>
        Tarefa? ObterPorId(int id);

        /// <summary>
        /// Adiciona uma nova tarefa.
        /// </summary>
        /// <param name="tarefa">A tarefa a ser adicionada.</param>
        void Adicionar(Tarefa tarefa);

        /// <summary>
        /// Atualiza uma tarefa existente.
        /// </summary>
        /// <param name="tarefa">A tarefa com os dados atualizados.</param>
        void Atualizar(Tarefa tarefa);

        /// <summary>
        /// Remove uma tarefa pelo seu ID.
        /// </summary>
        /// <param name="id">O ID da tarefa a ser removida.</param>
        void Remover(int id);
    }
}
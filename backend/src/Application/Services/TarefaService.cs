using System.Threading.Tasks;
using TodoBack.Application.Interfaces;
using TodoBack.Domain.Entities;
using TodoBack.Infrastructure.Interfaces;

/// <summary>
/// Serviço responsável por gerenciar tarefas.
/// </summary>
namespace TodoBack.Application.Services
{
    /// <summary>
    /// Inicializa uma nova instância do serviço de tarefas.
    /// </summary>
    /// <param name="tarefaRepository">Repositório de tarefas.</param>
    public class TarefaService(ITarefaRepository tarefaRepository) : ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository = tarefaRepository;

        /// <summary>
        /// Obtém todas as tarefas cadastradas.
        /// </summary>
        /// <returns>Uma coleção de tarefas.</returns>
        public async Task<IEnumerable<Tarefa>> ObterTodas()
        {
            return await _tarefaRepository.ObterTodas();
        }

        /// <summary>
        /// Obtém uma tarefa pelo identificador único.
        /// </summary>
        /// <param name="id">Identificador da tarefa.</param>
        /// <returns>Uma instância de <see cref="Tarefa"/> ou null se não encontrada.</returns>
        public async Task<Tarefa?> ObterPorId(int id)
        {
            return await _tarefaRepository.ObterPorId(id);
        }

        /// <summary>
        /// Adiciona uma nova tarefa ao repositório.
        /// </summary>
        /// <param name="tarefa">Tarefa a ser adicionada.</param>
        public async Task<Tarefa> Adicionar(Tarefa tarefa)
        {
            return await _tarefaRepository.Adicionar(tarefa);
        }

        /// <summary>
        /// Atualiza uma tarefa existente.
        /// </summary>
        /// <param name="tarefa">Tarefa com os dados atualizados.</param>
        public async Task<Tarefa> Atualizar(Tarefa tarefa)
        {
            return await _tarefaRepository.Atualizar(tarefa);
        }

        /// <summary>
        /// Remove uma tarefa com base no identificador.
        /// </summary>
        /// <param name="id">Identificador da tarefa a ser removida.</param>
        public async Task Remover(int id)
        {
            await _tarefaRepository.Remover(id);
        }
    }
}

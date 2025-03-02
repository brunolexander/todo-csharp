using TodoBack.Domain.Entities;

namespace TodoBack.Application.Interfaces
{
    // Interface para o serviço de tarefas
    public interface ITarefaService
    {
        // Método para obter todas as tarefas
        IEnumerable<Tarefa> ObterTodas();

        // Método para obter uma tarefa por ID
        Tarefa ObterPorId(int id);

        // Método para adicionar uma nova tarefa
        void Adicionar(Tarefa tarefa);

        // Método para atualizar uma tarefa existente
        void Atualizar(Tarefa tarefa);

        // Método para remover uma tarefa por ID
        void Remover(int id);
    }
}
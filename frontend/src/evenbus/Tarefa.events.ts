/**
 * Enum para eventos relacionados a CardTarefa.
 */
export enum TarefaEvents 
{
    // Evento disparado quando uma tarefa é excluída.
    Excluida = '@Tarefa.excluida',

    // Evento disparado quando uma tarefa é criada
    Adicionada = '@Tarefa.adicionada',

    // Evento disparado quando uma tarefa é atualizada
    Atualizada = '@Tarefa.atualizada',

    // Evento disparado quando a contagem de tarefas é atualizada
    QuantidadeAtualizada = '@Tarefa.quantidadeAtualizada',

    // Event disparado quando é aplicado um filtro no status
    FiltroStatus = '@Tarefa.filtroStatus',
};
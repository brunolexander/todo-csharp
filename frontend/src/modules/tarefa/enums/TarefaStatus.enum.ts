/**
 * Enum representando o status de uma tarefa (Tarefa).
 * 
 * @enum {string}
 * @property {string} Pendente - A tarefa está pendente e ainda não foi iniciada.
 * @property {string} EmProgresso - A tarefa está atualmente em progresso.
 * @property {string} Concluida - A tarefa foi concluída.
 */
enum TarefaStatus {
    Pendente = 'Pendente',
    EmProgresso = 'EmProgresso',
    Concluida = 'Concluida',
};

export default TarefaStatus;
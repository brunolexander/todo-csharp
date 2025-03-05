import TarefaStatus from '../enums/TarefaStatus.enum';

// Interface que define as propriedades do componente CardTarefa
interface Tarefa {
    id: number; // Identificador único da tarefa
    titulo: string; // Título da tarefa
    descricao: string | null; // Descrição detalhada da tarefa
    dataCriacao: Date; // Data de criação da tarefa
    dataConclusao: Date | null; // Data de conclusão da tarefa
    status: TarefaStatus; // Status atual da tarefa
    ordenacao: number;
};

export default Tarefa;
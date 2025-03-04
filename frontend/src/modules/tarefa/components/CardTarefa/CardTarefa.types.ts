import TarefaStatus from '../../enums/TarefaStatus.enum';

// Interface que define as propriedades do componente CardTarefa
interface CardTarefaProps {
    id: Number; // Identificador único da tarefa
    titulo: string; // Título da tarefa
    descricao: String | null; // Descrição detalhada da tarefa
    dataCriacao: Date; // Data de criação da tarefa
    dataConclusao: Date | null; // Data de conclusão da tarefa
    status: TarefaStatus; // Status atual da tarefa
};

export default CardTarefaProps;
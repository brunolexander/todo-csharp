import TarefaStatus from "../../enums/TarefaStatus.enum";
import Tarefa from "../../models/Tarefa.model";

/**
 * Propriedades para o componente GrupoTarefas.
 *
 * @interface GrupoTarefasProps
 * @property {TarefaStatus} status - O status do grupo de tarefas.
 */
interface GrupoTarefasProps {
    status: TarefaStatus;
    titulo: string;
    tarefas: Tarefa[];
}

export default GrupoTarefasProps;
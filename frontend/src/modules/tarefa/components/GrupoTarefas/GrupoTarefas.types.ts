import TarefaStatus from "../../enums/TarefaStatus.enum";

/**
 * Propriedades para o componente GrupoTarefas.
 *
 * @interface GrupoTarefasProps
 * @property {TarefaStatus} status - O status do grupo de tarefas.
 */
interface GrupoTarefasProps {
    status: TarefaStatus;
}

export default GrupoTarefasProps;
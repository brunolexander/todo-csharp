import GrupoTarefasProps from './GrupoTarefas.types';
import BotaoAdicionarTarefa from '../BotaoAdicionarTarefa';
import TarefaStatus from '../../enums/TarefaStatus.enum';
import CardTarefa from '../CardTarefa';

function GrupoTarefas({
    status,
    tarefas
}: GrupoTarefasProps
) {
    const descricaoStatus = {
        [TarefaStatus.Pendente]: "Pendente",
        [TarefaStatus.EmProgresso]: "Em Progresso",
        [TarefaStatus.Concluida]: "Concluído",
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-md p-4">
            <div className="mb-2 flex justify-between items-center">
                <span className="font-semibold">{descricaoStatus[status]} ({tarefas.length})</span>
                <BotaoAdicionarTarefa />
            </div>

            {tarefas.map((tarefa) => (
            <CardTarefa
                id={tarefa.id}
                titulo={tarefa.titulo}
                descricao={tarefa.descricao}
                dataCriacao={tarefa.dataCriacao}
                dataConclusao={tarefa.dataConclusao}
                status={tarefa.status}
            />
            ))}
        </div>
    );
}

export default GrupoTarefas;
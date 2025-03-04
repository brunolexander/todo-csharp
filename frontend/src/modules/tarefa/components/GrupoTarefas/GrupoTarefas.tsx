import React from 'react';
import GrupoTarefasProps from './GrupoTarefas.types';
import BotaoAdicionarTarefa from '../BotaoAdicionarTarefa';
import TarefaStatus from '../../enums/TarefaStatus.enum';
import CardTarefa from '../CardTarefa';

function GrupoTarefas({
    status
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
                <span className="font-semibold">{descricaoStatus[status]} (4)</span>
                <BotaoAdicionarTarefa />
            </div>

            <CardTarefa
                id={0}
                titulo={''}
                descricao={null}
                dataCriacao={new Date()}
                dataConclusao={null}
                status={TarefaStatus.Pendente}
            />

            <CardTarefa
                id={0}
                titulo={''}
                descricao={null}
                dataCriacao={new Date()}
                dataConclusao={null}
                status={TarefaStatus.Pendente}
            />

            <CardTarefa
                id={0}
                titulo={''}
                descricao={null}
                dataCriacao={new Date()}
                dataConclusao={null}
                status={TarefaStatus.Pendente}
            />

            <CardTarefa
                id={0}
                titulo={''}
                descricao={null}
                dataCriacao={new Date()}
                dataConclusao={null}
                status={TarefaStatus.Pendente}
            />
        </div>
    );
}

export default GrupoTarefas;
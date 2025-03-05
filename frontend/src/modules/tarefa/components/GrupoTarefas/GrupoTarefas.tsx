import GrupoTarefasProps from "./GrupoTarefas.types";
import BotaoAdicionarTarefa from "../BotaoAdicionarTarefa";
import CardTarefa from "../CardTarefa";
import { rectSortingStrategy, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function GrupoTarefas({ status, titulo, tarefas }: GrupoTarefasProps) {

  const { setNodeRef } = useDroppable({ 
    id: status,
    data: { status }
  });
  
  return (
    <SortableContext
      id={status}
      items={tarefas}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}
        className={`transition-opacity  bg-gray-800 rounded-lg shadow-md p-4`}
      >
        <div className="mb-2 flex flex-col lg:flex-row items-center justify-between">
          <span className="font-semibold">
            {titulo} ({tarefas.length})
          </span>
          <BotaoAdicionarTarefa />
        </div>

        {tarefas.map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            id={tarefa.id}
            titulo={tarefa.titulo}
            descricao={tarefa.descricao}
            dataCriacao={tarefa.dataCriacao}
            dataConclusao={tarefa.dataConclusao}
            status={tarefa.status}
            ordenacao={tarefa.ordenacao}
          />
        ))}
      </div>
    </SortableContext>
  );
}

export default GrupoTarefas;

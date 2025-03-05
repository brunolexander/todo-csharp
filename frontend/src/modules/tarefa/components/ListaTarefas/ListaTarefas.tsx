import EventBus, { TarefaEvents } from "@/evenbus";
import CardTarefa from "@/modules/tarefa/components/CardTarefa";
import GruposTarefa from "@/modules/tarefa/components/GrupoTarefas";
import TarefaStatus from "@/modules/tarefa/enums/TarefaStatus.enum";
import Tarefa from "@/modules/tarefa/models/Tarefa.model";
import * as TarefaService from "@/modules/tarefa/services/Tarefa.service";
import debounce from "@/utils/debounce";
import CardTarefaSensor from "./CardTarefaSensor";
import { useEffect, useMemo, useState } from "react";

import {
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors
} from "@dnd-kit/core";


function ListaTarefas() {
  const sensors = useSensors(useSensor(CardTarefaSensor));
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarfaOverlay, setTarefaOverlay] = useState<Tarefa>(null);
  const [filtroStatus, setFiltroStatus] = useState<TarefaStatus>(null);

  const tarefasAgrupadas = useMemo(() => {
    return {
      concluidas: tarefas.filter(
        (tarefa) => tarefa.status === TarefaStatus.Concluida
      ),
      pendentes: tarefas.filter(
        (tarefa) => tarefa.status === TarefaStatus.Pendente
      ),
      emProgresso: tarefas.filter(
        (tarefa) => tarefa.status === TarefaStatus.EmProgresso
      ),
    };
  }, [tarefas]);

  useEffect(() => {
    EventBus.dispatch(TarefaEvents.QuantidadeAtualizada, {
      tudo: tarefas.length,
      concluidas: tarefasAgrupadas.concluidas.length,
      pendentes: tarefasAgrupadas.pendentes.length,
      emProgresso: tarefasAgrupadas.emProgresso.length,
    });
  }, [tarefasAgrupadas]);

  useEffect(() => {
    TarefaService.listarTodas().then((tarefas: Tarefa[]) => {
      setTarefas(tarefas.sort((a, b) => a.ordenacao - b.ordenacao));
    });

    // Atualizar lista quando tarefa for excluída
    EventBus.on(TarefaEvents.Excluida, (dados: { id: number }) => {
      setTarefas((listaAtual) =>
        listaAtual.filter((tarefa) => tarefa.id !== dados.id)
      );
    });

    // Atualizar lista quando tarefa for adicionada
    EventBus.on(TarefaEvents.Adicionada, (dados: Tarefa) => {
      setTarefas((listaAtual) => [...listaAtual, dados]);
    });

    // Atualizar lista quando tarefa for modificada
    EventBus.on(TarefaEvents.Atualizada, (dados: Tarefa) => {
      setTarefas((listaAtual) =>
        listaAtual.map((tarefa) => tarefa.id !== dados.id ? tarefa : dados)
      );
    });
    
    // Atualizar exibição dos grupos de tarefas ao fitlrar o status
    EventBus.on(TarefaEvents.FiltroStatus, ({ status }: { status: TarefaStatus | null }) => {
      setFiltroStatus(status);
    });
  }, []);

  const onDragStart = (event: DragStartEvent): void => {
    setTarefaOverlay(tarefas.find((t) => t.id === event.active.id));
  };

  const onDragOver = debounce((event: DragOverEvent): void => {
    const { active, over, collisions } = event;
    if (over !== null) {
      const novoStatus = over.data.current.status;

      if (active.data.current.status != novoStatus) {
        setTarefas((listaAtual) => {
          return listaAtual.map((tarefa) =>
            tarefa.id === active.data.current.id
              ? { ...tarefa, status: novoStatus }
              : tarefa
          );
        });
      }
    }
  }, 10);

  const onDragEnd = (event: DragEndEvent): Promise<void> => {
    const { active, over } = event;
    const tarefaAtiva = tarefas.find((t) => t.id === active.id);
    const tarefaSobreposta = tarefas.find((t) => t.id === over.id);

    if (!tarefaAtiva) {
      return;
    }

    // Esconder overlay
    setTarefaOverlay(null);

    // Atualizar status da tarefa ativa
    TarefaService.atualizar(tarefaAtiva);

    if (tarefaSobreposta) {
      // Reordenar as tarefas
      setTarefas((listaAtual) => {
        const novasTarefas = listaAtual.map((tarefa) =>
          tarefa.id === tarefaAtiva.id
            ? tarefaSobreposta
            : tarefa.id === tarefaSobreposta.id
            ? tarefaAtiva
            : tarefa
        );

        // Salvar ordenação
        TarefaService.salvarOrdenacao(
          novasTarefas.map((tarefa, ordenacao) => ({
            id: tarefa.id,
            ordenacao,
          }))
        );

        return novasTarefas;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      // collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <section className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows gap-4 w-full">
        <DragOverlay dropAnimation={defaultDropAnimation}>
          {tarfaOverlay ? (
            <CardTarefa
              key={tarfaOverlay.id}
              id={tarfaOverlay.id}
              titulo={tarfaOverlay.titulo}
              descricao={tarfaOverlay.descricao}
              dataCriacao={tarfaOverlay.dataCriacao}
              dataConclusao={tarfaOverlay.dataConclusao}
              status={tarfaOverlay.status}
              ordenacao={tarfaOverlay.ordenacao}
            />
          ) : null}
        </DragOverlay>

        {filtroStatus === null || filtroStatus === TarefaStatus.Pendente 
          ? <GruposTarefa
            status={TarefaStatus.Pendente}
            titulo={"Pendente"}
            tarefas={tarefasAgrupadas.pendentes}
          /> : null
        }

        {
          (filtroStatus === null || filtroStatus === TarefaStatus.EmProgresso) 
            ? <GruposTarefa
                status={TarefaStatus.EmProgresso}
                titulo={"Em Progresso"}
                tarefas={tarefasAgrupadas.emProgresso}
              /> : null
        }

        {
          (filtroStatus === null || filtroStatus === TarefaStatus.Concluida) 
            ? <GruposTarefa
                status={TarefaStatus.Concluida}
                titulo={"Concluída"}
                tarefas={tarefasAgrupadas.concluidas}
              /> : null
        }
      </section>
    </DndContext>
  );
}

export default ListaTarefas;

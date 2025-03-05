import { useState, useMemo, useEffect } from "react";
import "./App.css";
import GruposTarefa from "./modules/tarefa/components/GrupoTarefas";
import TarefaStatus from "./modules/tarefa/enums/TarefaStatus.enum";
import Header from "./components/Header";
import BarraLateral from "./components/BarraLateral/BarraLateral";
import Tarefa from "./modules/tarefa/models/Tarefa.model";
import * as TarefaService from "./modules/tarefa/services/Tarefa.service";
import CardTarefa from "./modules/tarefa/components/CardTarefa";
import EventBus, { TarefaEvents } from "./evenbus";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimation,
  DragStartEvent,
  PointerSensorOptions,
} from "@dnd-kit/core";

class CardTarefaSensor extends PointerSensor {
    static activators = [
      {
        eventName: 'onPointerDown' as const,
        handler: (
          { nativeEvent: event }: PointerEvent,
          { onActivation }: PointerSensorOptions,
        ): boolean => (event.target.closest('button') === null)
      }
    ];
  }

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

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

  const [tarfaOverlay, setTarefaOverlay] = useState<Tarefa>(null);

  useEffect(() => {
    TarefaService.listarTodas().then((tarefas: Tarefa[]) => {
      setTarefas(tarefas.sort((a, b) => a.ordenacao - b.ordenacao));
    });
    
    EventBus.on(TarefaEvents.Excluida, (data) => {
      setTarefas((listaAtual) => listaAtual.filter((tarefa) => tarefa.id !== data.id));
    });
    
  }, []);

  const sensors = useSensors(
    useSensor(CardTarefaSensor)
  );

  // Função debounce para limitar chamadas da mesma função em um curto espaço de tempo
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId); // Cancela o timeout anterior
      timeoutId = setTimeout(() => func(...args), delay); // Define um novo timeout
    };
  };

  const onDragStart = (event: DragStartEvent): void => {
    setTarefaOverlay(tarefas.find(t => t.id === event.active.id));
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
    const tarefaAtiva = tarefas.find(t => t.id === active.id);
    const tarefaSobreposta = tarefas.find(t => t.id === over.id);

    if (!tarefaAtiva) {
      return;
    }

    // Esconder overlay
    setTarefaOverlay(null);

    // Atualizar status da tarefa ativa
    TarefaService.atualizar(tarefaAtiva);

    if (tarefaSobreposta) {
      // Reordenar as tarefas
      setTarefas(listaAtual => {
        const novasTarefas = listaAtual.map(tarefa => 
          tarefa.id === tarefaAtiva.id
            ? tarefaSobreposta
            : tarefa.id === tarefaSobreposta.id
            ? tarefaAtiva
            : tarefa
        );
      
        // Salvar ordenação
        TarefaService.salvarOrdenacao(novasTarefas.map((tarefa, ordenacao) => ({ id: tarefa.id, ordenacao })));
      
        return novasTarefas;
      });
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white font-sans flex min-h-screen h-full">
        <BarraLateral />

        <main className="flex flex-col flex-1 p-8 ml-64">
          <Header />

          <DndContext
            sensors={sensors}
            // collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          >
            <section className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
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

              <GruposTarefa
                status={TarefaStatus.Pendente}
                titulo={"Pendente"}
                tarefas={tarefasAgrupadas.pendentes}
              />
              <GruposTarefa
                status={TarefaStatus.EmProgresso}
                titulo={"Em Progresso"}
                tarefas={tarefasAgrupadas.emProgresso}
              />
              <GruposTarefa
                status={TarefaStatus.Concluida}
                titulo={"Concluída"}
                tarefas={tarefasAgrupadas.concluidas}
              />
            </section>
          </DndContext>
        </main>
      </div>
    </>
  );
}

export default App;

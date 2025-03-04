import React, { useState, useMemo, useEffect } from 'react';
import './App.css'
import GruposTarefa from './modules/tarefa/components/GrupoTarefas';
import TarefaStatus from './modules/tarefa/enums/TarefaStatus.enum'
import Header from './components/Header';
import BarraLateral from './components/BarraLateral/BarraLateral';
import Tarefa from './modules/tarefa/models/Tarefa.model';
import { listarTodas } from './modules/tarefa/services/Tarefa.service';

function App() {

	const [tarefas, setTarefas] = useState<Tarefa[]>([]);

	const tarefasAgrupadas = useMemo(() => {
		return {
			concluidas: tarefas.filter((tarefa) => tarefa.status === TarefaStatus.Concluida),
			pendentes: tarefas.filter((tarefa) => tarefa.status === TarefaStatus.Pendente),
			emProgresso: tarefas.filter((tarefa) => tarefa.status === TarefaStatus.EmProgresso),
		};
	}, [tarefas]);
	
	useEffect(() => {
		listarTodas().then((tarefas: Tarefa[]) => {
			setTarefas(tarefas);
		});
	}, []);

	return (
		<>
			<div className='bg-gray-900 text-white font-sans flex min-h-screen h-full'>
				<BarraLateral />
				
				<main className="flex-1 p-8 ml-64">
					<Header />

					<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
						<GruposTarefa status={TarefaStatus.Pendente} tarefas={tarefasAgrupadas.pendentes} />
						<GruposTarefa status={TarefaStatus.EmProgresso} tarefas={tarefasAgrupadas.emProgresso} />
						<GruposTarefa status={TarefaStatus.Concluida} tarefas={tarefasAgrupadas.concluidas} />
					</section>
				</main>

			</div>
		</>
	)
}

export default App;

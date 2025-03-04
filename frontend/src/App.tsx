import React from 'react';
import './App.css'
import GruposTarefa from './modules/tarefa/components/GrupoTarefas';
import TarefaStatus from './modules/tarefa/enums/TarefaStatus.enum'
import Header from './components/Header';
import BarraLateral from './components/BarraLateral/BarraLateral';

function App() {

	return (
		<>
			<div className='bg-gray-900 text-white font-sans flex h-full'>
				<BarraLateral />
				
				<main className="flex-1 p-8 ml-64">
					<Header />

					<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
						<GruposTarefa status={TarefaStatus.Pendente} />
						<GruposTarefa status={TarefaStatus.EmProgresso} />
						<GruposTarefa status={TarefaStatus.Concluida} />
					</section>
				</main>

			</div>
		</>
	)
}

export default App;

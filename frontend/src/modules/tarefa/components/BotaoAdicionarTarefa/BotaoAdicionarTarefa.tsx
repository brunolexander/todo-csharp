import { TarefaEvents } from "@/evenbus";
import EventBus from "@/evenbus/EventBus";
import TarefaStatus from "../../enums/TarefaStatus.enum";
import { MouseEventHandler } from "react";

/**
 * Componente de botão para adicionar uma nova tarefa.
 * Exibe um ícone de adição ao lado do texto.
 */
function BotaoAdicionarTarefa({ onClick }: { onClick: MouseEventHandler }) {
    return (
        <button 
            type="button" onClick={onClick} 
            className="text-green-500 flex items-center cursor-pointer"
        >    
            {/* Ícone de adição (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            {/* Texto do botão */}
            Adicionar Tarefa
        </button>
    );
}

export default BotaoAdicionarTarefa;

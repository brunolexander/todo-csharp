import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardTarefaProps from './CardTarefa.types';
import { useState } from 'react';
import * as TarefaService from '../../services/Tarefa.service';
import EventBus, { TarefaEvents } from '@/evenbus';
import Tarefa from '../../models/Tarefa.model';
import BotaoEditarTarefa from '../BotaoEditarTarefa';

function CardTarefa(props: CardTarefaProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: props.id,
        data: { id: props.id, status: props.status }
    });

    const [excluindo, setExcluindo] = useState(false);

    const onClickExcluir = async (e) => {
        setExcluindo(true);

        try {
            await TarefaService.excluir(props.id);

            EventBus.dispatch(TarefaEvents.Excluida, { id: props.id });
        } finally {
            setExcluindo(false);
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <>
        
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
            className={`${isDragging ? 'opacity-50' : ''} transiotion-opacity bg-gray-700 rounded-lg p-4 mb-2 cursor-grab`}
            >
            <div className="flex justify-between items-center">
                <div className="text-start mt-2 text-sm text-gray-400">
                    <span className='capitalize'>
                        {`
                            ${props.dataCriacao.toLocaleDateString("pt-BR", { day: '2-digit' })}
                            ${props.dataCriacao.toLocaleDateString("pt-BR", { month: 'long' })}
                            ${props.dataCriacao.toLocaleDateString("pt-BR", { year: 'numeric' })}
                        `} 
                    </span>
                </div>
                
                <div className='flex gap-2'>
                    {/* Botão editar */}
                    <BotaoEditarTarefa tarefa={props} />
                    
                    {/* Botão excluir */}
                    <button
                        type="button"
                        className={`${excluindo ? 'opacity-50' : ''} cursor-pointer bg-red-900 hover:bg-red-800 text-red-300 rounded-full p-2 shadow-sm transition duration-200 ease-in-out`}
                        onClick={onClickExcluir}
                        title="Excluir"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="16"
                        height="16"
                        fill="currentColor"
                        stroke="none"
                        >
                        <path
                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                        />
                        </svg>
                    </button>
                </div>
            </div>
            
            <h3 className="font-semibold truncate">{ props.titulo }</h3>
            <p className="text-sm text-gray-400 truncate">{ props.descricao || <i>Sem descrição</i>}</p>
            {/* <div className="flex items-center justify-between mt-2">
                <span className="text-xs">Progresso</span>
                <span className="text-xs">7/10</span>
            </div>
            <div className="bg-gray-600 h-2 rounded-full">
                <div className="bg-orange-500 h-2 rounded-full w-[70%]"></div>
            </div> */}
            
        </div>
    </>
    
    );
}

export default CardTarefa;
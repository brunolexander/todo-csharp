import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardTarefaProps from './CardTarefa.types';
import { useState } from 'react';
import * as TarefaService from '../../services/Tarefa.service';
import EventBus, { TarefaEvents } from '@/evenbus';
import Tarefa from '../../models/Tarefa.model';

function CardTarefa({
    id, 
    titulo, 
    descricao, 
    dataCriacao, 
    dataConclusao, 
    status,
    ordenacao
}: CardTarefaProps
) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id,
        data: { id, status }
    });

    const [excluindo, setExcluindo] = useState(false);

    const onClickExcluir = async (e) => {
        setExcluindo(true);

        try {
            await TarefaService.excluir(id);

            EventBus.dispatch(TarefaEvents.Excluida, { id });
        } finally {
            setExcluindo(false);
        }
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
            className={`${isDragging ? 'opacity-50' : ''} transiotion-opacity bg-gray-700 rounded-lg p-4 mb-2 cursor-grab`}
            >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{ titulo }</h3>
                
                <div className='flex gap-2'>
                    {/* Botão editar */}
                    <button
                        type='button'
                        title='Editar'
                        className='cursor-pointer bg-green-200 hover:bg-green-100 text-green-700 rounded-full p-2 shadow-sm transition duration-200 ease-in-out'
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="16"
                        height="16"
                        fill="currentColor"
                        stroke="none"
                        >
                        <path
                            d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
                        />
                        </svg>
                    </button>

                    {/* Botão excluir */}
                    <button
                        type="button"
                        className={`${excluindo ? 'opacity-50' : ''} cursor-pointer bg-red-200 hover:bg-red-100 text-red-700 rounded-full p-2 shadow-sm transition duration-200 ease-in-out`}
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
                
            <p className="text-sm text-gray-400">{ descricao || <i>Sem descrição</i>}</p>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs">Progresso</span>
                <span className="text-xs">7/10</span>
            </div>
            <div className="bg-gray-600 h-2 rounded-full">
                <div className="bg-orange-500 h-2 rounded-full w-[70%]"></div>
            </div>
            <div className="text-start mt-2 text-sm text-gray-400">
                <span className='capitalize'>
                    {`
                        ${dataCriacao.toLocaleDateString("pt-BR", { day: '2-digit' })}
                        ${dataCriacao.toLocaleDateString("pt-BR", { month: 'long' })}
                        ${dataCriacao.toLocaleDateString("pt-BR", { year: 'numeric' })}
                    `} 
                </span>
            </div>
        </div>
    );
}

export default CardTarefa;
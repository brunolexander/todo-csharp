import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CardTarefaProps from './CardTarefa.types';

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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} 
            className={`${isDragging ? 'opacity-50' : ''} bg-gray-700 rounded-lg p-4 mb-2 cursor-grab`}
            >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">{ titulo }</h3>
                <button className="text-gray-500">...</button>
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
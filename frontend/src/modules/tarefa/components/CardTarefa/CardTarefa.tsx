import React from 'react';
import CardTarefaProps from './CardTarefa.types';

function CardTarefa({
    id, 
    titulo, 
    descricao, 
    dataCriacao, 
    dataConclusao, 
    status
}: CardTarefaProps
) {
    
    return (
        <div className="bg-gray-700 rounded-lg p-4 mb-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Design new ui presentation</h3>
                <button className="text-gray-500">...</button>
            </div>
            <p className="text-sm text-gray-400">Dribbble marketing</p>
            <div className="flex items-center justify-between mt-2">
                <span className="text-xs">Progress</span>
                <span className="text-xs">7/10</span>
            </div>
            <div className="bg-gray-600 h-2 rounded-full">
                <div className="bg-orange-500 h-2 rounded-full w-[70%]"></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <span>24 Aug 2022</span>
                <span>💬7 📌2</span>
            </div>
        </div>
    );
}

export default CardTarefa;
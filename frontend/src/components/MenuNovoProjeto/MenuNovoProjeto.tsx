import React, { useState } from "react";

interface MenuNovoProjetoProps {
    onConfirmar: () => void;
    onCancelar: () => void;
}

function MenuNovoProjeto() 
{
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const handleConfirmar = () => {
        //onConfirmar();
        setMostrarMenu(false); // Esconde o menu após confirmar
    };

    const handleCancelar = () => {
        //onCancelar();
        setMostrarMenu(false); // Esconde o menu após cancelar
    };

    return (
        <div className="relative">
           <button
                onClick={() => setMostrarMenu(!mostrarMenu)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg flex items-center shadow-md transition">
                + Novo Projeto
            </button>

            {mostrarMenu ? (
                <div className="absolute right-0 mt-3 p-4 w-72 bg-gray-700 text-white rounded-lg shadow-lg transition-all duration-200 border border-gray-500 shadow-xl">
                    <input 
                        type="text" 
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome do projeto"
                    ></input>

                    <div className="flex mt-3 space-x-2">
                        <button 
                            onClick={handleConfirmar} 
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex-1 transition">
                            ✓
                        </button>
                        <button 
                            onClick={handleCancelar} 
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex-1 transition">
                            ✕
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default MenuNovoProjeto;
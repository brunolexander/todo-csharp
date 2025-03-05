import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "@/components/Icones/Spinner";
import TarefaStatus from "../../enums/TarefaStatus.enum";
import * as TarefaService from "@/modules/tarefa/services/Tarefa.service";
import Tarefa from "../../models/Tarefa.model";
import EventBus from "@/evenbus/EventBus";
import { TarefaEvents } from "@/evenbus";

interface MenuNovoProjetoProps {
    onConfirmar: () => void;
    onCancelar: () => void;
}

function BotaoEditarTarefa({ tarefa } : { tarefa: Tarefa}) {
    let titulo = '';
    let descricao = '';

    const [mostrarMenu, setMostrarMenu] = useState<boolean>(false);
    const [salvando, setSalvando] = useState<boolean>(false);
    const [erroTitulo, setErroTitulo] = useState<string>(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!mostrarMenu) {
            titulo = '';
            descricao = '';
            setErroTitulo(null);
        }
    }, [mostrarMenu])

    const handleConfirmar = async () => {
        if (!titulo || !titulo.trim()) {
            setErroTitulo('O título é obrigatório.');
            return;
        }

        if (titulo.length > 100) {
            setErroTitulo('O título deve ter no máximo 100 caracteres.');
            return;
        }

        setSalvando(true);

        try {
            
            let tarefaAtualizada = await TarefaService.atualizar({
                ...tarefa,
                titulo,
                descricao
            });

            EventBus.dispatch(TarefaEvents.Atualizada, { ...tarefaAtualizada });
        } catch (error) {
            console.error(error)
        } finally {
            setSalvando(false);
            //onConfirmar();
            setMostrarMenu(false); // Esconde o menu após confirmar
        }
    };

    const handleCancelar = () => {
        //onCancelar();
        setMostrarMenu(false); // Esconde o menu após cancelar
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMostrarMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button
                type='button'
                title='Editar'
                onClick={() => setMostrarMenu(true)}
                className='cursor-pointer bg-green-800 hover:bg-green-700 text-green-300 rounded-full p-2 shadow-sm transition duration-200 ease-in-out'
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
            
        <AnimatePresence>
            {mostrarMenu && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="menu-editar absolute z-40 right-0 mt-3 p-4 w-90 bg-gray-700 text-white rounded-lg shadow-lg border border-gray-500 shadow-xl"
                >
                    <input 
                        type="text" 
                        className={`w-full p-2 mb-1 ${erroTitulo ? 'border-red-600' : 'border-gray-600'} bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Insira um título..."
                        onChange={(event) => { titulo = event.target.value }}
                        autoFocus={true}
                    ></input>
                    { erroTitulo ? <small className="text-red-500">{ erroTitulo }</small> : null }

                    <input 
                        type="text" 
                        className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Insira uma descrição..."
                        onChange={(event) => { descricao = event.target.value }}
                    ></input>

                    <div className="flex mt-3 space-x-2">
                        <button 
                            type="button"
                            onClick={handleConfirmar} 
                            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex-1 transition">
                            { salvando ? <Spinner /> : '\u2713' }
                        </button>
                        <button 
                            type="button"
                            onClick={handleCancelar} 
                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md flex-1 transition">
                            &#10005;
                        </button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default BotaoEditarTarefa;

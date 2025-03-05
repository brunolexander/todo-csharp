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

function MenuAdicionarTarefa({ status, ordenacao }: { status: TarefaStatus, ordenacao: number }) {
    let titulo = '';
    let descricao = '';

    const [mostrarMenu, setMostrarMenu] = useState(false);
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
            const tarefa = await TarefaService.criar({
                titulo,
                descricao,
                status,
                ordenacao
            });

            EventBus.dispatch(TarefaEvents.Adicionada, { ...tarefa });
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
                onClick={() => setMostrarMenu(!mostrarMenu)}
                className="text-green-500 flex items-center cursor-pointer"> 

                {/* Ícone de adição (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                {/* Texto do botão */}
                Adicionar Tarefa
            </button>

            <AnimatePresence>
                {mostrarMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-40 right-0 mt-3 p-4 w-90 bg-gray-700 text-white rounded-lg shadow-lg border border-gray-500 shadow-xl"
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

export default MenuAdicionarTarefa;

import React, { useState } from "react";
import MenuAccordionProps from "./MenuAccordion.types";

// Definição do componente MenuAccordion
function MenuAccordion({ children, titulo }: MenuAccordionProps) {
    // Estado para gerenciar a expansão do menu
    const [expandir, setExpandir] = useState(false);

    return (
        <>
            {/* Botão para alternar a expansão do menu */}
            <button 
                onClick={() => setExpandir(!expandir)} 
                className="block w-full text-left hover:bg-gray-700 p-2 rounded mb-2 cursor-pointer"
            >
                {titulo} &raquo;
            </button>
            
            {/* Renderiza condicionalmente os filhos se o menu estiver expandido */}
            {expandir && (
                <ul className="ml-4">
                    {children}
                </ul>
            )}
        </>
    );
}

export default MenuAccordion;
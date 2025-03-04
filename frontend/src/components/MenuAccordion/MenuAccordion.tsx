import React, { useState } from "react";
import { motion } from "motion/react"
import MenuAccordionProps from "./MenuAccordion.types";

// Definição do componente MenuAccordion
function MenuAccordion({ children, titulo }: MenuAccordionProps) {
    // Estado para gerenciar a expansão do menu
    const [expandir, setExpandir] = useState(true);

    return (
        <>
            {/* Botão para abrir/fechar */}
            <button 
                onClick={() => setExpandir(!expandir)} 
                className="block w-full text-left hover:bg-gray-700 p-2 rounded mb-2 cursor-pointer"
            >
                {titulo}

                <motion.span 
                    className="float-right"
                    animate={{ rotate: expandir ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    &raquo;
                </motion.span>
            </button>

            {/* Menu deslizante */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: expandir ? "auto" : 0, opacity: expandir ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }} // Garante que o conteúdo não vaze
            >
                <ul className="ml-4">{children}</ul>
            </motion.div>
        </>
    );
}

export default MenuAccordion;
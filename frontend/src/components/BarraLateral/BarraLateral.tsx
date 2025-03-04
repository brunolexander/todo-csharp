import React, { useState } from "react";

import MenuAccordion from '../MenuAccordion';
import MenuItem from "../MenuAccordion/MenuItem";

function BarraLateral() {
    const [projetosAberto, setProjetosAberto] = useState(true);
    const [tarefasAberto, setTarefasAberto] = useState(true);

    return (
        <aside className="w-64 bg-gray-800 p-4 flex flex-col fixed h-full">
            <div className="mb-8">
                <h1 className="text-lg font-semibold">Logotipo</h1>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul>
                    <li>
                        <MenuAccordion titulo={'Projetos'}>
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                        </MenuAccordion>
                    </li>

                    <li>
                        <MenuAccordion titulo={'Tarefas'}>
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                            <MenuItem />
                        </MenuAccordion>
                    </li>
                </ul>
            </nav>

            <div className="border-t border-gray-700 pt-4 mt-auto">
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m9-9h-2.25M3 12h2.25m15.364-6.364l-1.591 1.591M6.227 17.773l-1.591 1.591m0-13.182l1.591 1.591m13.182 0l-1.591-1.591M12 6.75a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5z"/>
                    </svg>
                    Claro
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded w-full mt-2 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 15a9 9 0 11-9-9c0 .327.014.65.042.97a6.75 6.75 0 008.988 8.988c.32.028.643.042.97.042z"/>
                    </svg>
                    Escuro
                </button>
            </div>
        </aside>
    );
}

export default BarraLateral;
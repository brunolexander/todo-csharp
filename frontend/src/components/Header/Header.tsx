import React from "react";
import MenuNovoProjeto from "../MenuNovoProjeto/MenuNovoProjeto";

function Header() {
    return (
        <header className="flex justify-between items-center mb-8" x-data="{ showSubMenu: false, templateName: '' }">
            <div className="text-2xl font-semibold text-white">Gerenciar Tarefas 📝</div>
            
            <MenuNovoProjeto />
        </header>
    ); 
}

export default Header;
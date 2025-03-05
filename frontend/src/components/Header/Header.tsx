
function Header() {
    return (
        <header className="flex justify-between items-center mb-8" x-data="{ showSubMenu: false, templateName: '' }">
            <div className="text-2xl font-semibold text-white">Gerenciar Tarefas 📝</div>
        </header>
    ); 
}

export default Header;
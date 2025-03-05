import React, { MouseEventHandler } from "react";

function MenuItem({ titulo, ativo, onClick }: { 
    titulo: string,
    ativo: boolean,
    onClick: MouseEventHandler
 }) {
    return (
        <li>
            <button
                type="button"
                onClick={onClick} 
                className={`block ${ativo ? 'bg-gray-900' : ''} py-4 w-full  cursor-pointer text-start hover:bg-gray-700 p-2 rounded`}>
            { titulo }</button>
        </li>
    );
}

export default MenuItem;
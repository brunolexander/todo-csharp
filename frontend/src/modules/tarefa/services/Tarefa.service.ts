import { API_URL } from '../../../config';
import TarefaStatus from '../enums/TarefaStatus.enum';
import Tarefa from '../models/Tarefa.model';

/**
 * Lista todas as tarefas.
 *
 * @returns Uma Promise que resolve com a resposta da API.
 */
export async function listarTodas(): Promise<Tarefa[]> {
    const response = await fetch(`${API_URL}/Tarefa`);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const tarefas = await response.json();

    return tarefas.map((tarefa: any) => converterJsonParaTarefa(tarefa));
}

/**
 * Atualiza uma tarefa existente.
 *
 * @param tarefa A tarefa a ser atualizada.
 * @returns Uma Promise que resolve com a resposta da API.
 */
export async function atualizar(tarefa: Tarefa): Promise<Tarefa> {
    const response = await fetch(`${API_URL}/Tarefa/${tarefa.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    return converterJsonParaTarefa(json);
}

/**
 * Excluí uma tarefa existente.
 *
 * @param id A ID tarefa a ser excluída.
 * @returns Uma Promise que resolve com a resposta da API.
 */
export async function excluir(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/Tarefa/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
}


/**
 * Salva a ordenação das tarefas.
 *
 * @param ordenacoes - Array de objetos contendo o ID da tarefa e sua ordenação.
 * @returns Uma Promise que resolve quando a operação for concluída.
 */
export async function salvarOrdenacao(ordenacoes: { id: number; ordenacao: number }[]): Promise<void> {
    const response = await fetch(`${API_URL}/Tarefa/Ordenacao`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenacoes),
    });

    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
}

/**
 * Converte um objeto JSON em uma instância de Tarefa.
 *
 * @param json O objeto JSON a ser convertido.
 * @returns Uma instância de Tarefa.
 */
export function converterJsonParaTarefa(json: {
    id: number; // Identificador único da tarefa
    titulo: string; // Título da tarefa
    descricao: string | null; // Descrição detalhada da tarefa
    dataCriacao: string; // Data de criação da tarefa
    dataConclusao: string | null; // Data de conclusão da tarefa
    status: TarefaStatus; // Status atual da tarefa,
    ordenacao: number; // Ordem da tarefa
}): Tarefa {
    return { 
        ...json, 
        dataCriacao: new Date(json.dataCriacao), 
        dataConclusao: json.dataConclusao ? new Date(json.dataConclusao) : null 
    };
}


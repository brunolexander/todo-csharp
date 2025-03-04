import { API_URL } from '../../../config';
import TarefaStatus from '../enums/TarefaStatus.enum';
import Tarefa from '../models/Tarefa.model';

/**
 * Lista todas as tarefas.
 *
 * Faz uma requisição para a API para obter todas as tarefas.
 *
 * @returns Uma Promise que resolve com a resposta da API em formato JSON.
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
    status: TarefaStatus; // Status atual da tarefa
}): Tarefa {
    return { 
        ...json, 
        dataCriacao: new Date(json.dataCriacao), 
        dataConclusao: json.dataConclusao ? new Date(json.dataConclusao) : null 
    };
}
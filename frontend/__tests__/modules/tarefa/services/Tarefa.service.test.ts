/**
 * Este arquivo contém testes para os métodos do serviço de Tarefa
 */

jest.mock('@/config', () => ({
  API_URL: 'mocked-api-url.com',
}));

import { describe, expect, it } from '@jest/globals'
import { API_URL } from '@/config';
import TarefaStatus from '@/modules/tarefa/enums/TarefaStatus.enum';
import { 
  converterJsonParaTarefa,
  listarTodas
 } from '@/modules/tarefa/services/Tarefa.service';

describe('TarefaService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe('listarTodas', () => {
    it('deve retornar uma lista de tarefas quando a requisição for bem-sucedida', async () => {
      // Mock da resposta da API
      const mockTarefasJson = [
        {
          id: 1,
          titulo: 'Tarefa 1',
          descricao: 'Descrição da Tarefa 1',
          dataCriacao: '2023-10-01T10:00:00Z',
          dataConclusao: null,
          status: TarefaStatus.Pendente,
        },
        {
          id: 2,
          titulo: 'Tarefa 2',
          descricao: 'Descrição da Tarefa 2',
          dataCriacao: '2023-10-02T11:00:00Z',
          dataConclusao: '2023-10-03T12:00:00Z',
          status: TarefaStatus.Concluida,
        },
      ];

      // Mock do fetch para retornar uma resposta bem-sucedida
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => mockTarefasJson,
      } as Response);      

      // Chama a função listarTodas
      const tarefas = await listarTodas();

      // Verifica se o fetch foi chamado com a URL correta
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/Tarefa`);

      // Verifica se a lista de tarefas foi retornada corretamente
      expect(tarefas).toEqual([
        {
          id: 1,
          titulo: 'Tarefa 1',
          descricao: 'Descrição da Tarefa 1',
          dataCriacao: new Date('2023-10-01T10:00:00Z'),
          dataConclusao: null,
          status: TarefaStatus.Pendente,
        },
        {
          id: 2,
          titulo: 'Tarefa 2',
          descricao: 'Descrição da Tarefa 2',
          dataCriacao: new Date('2023-10-02T11:00:00Z'),
          dataConclusao: new Date('2023-10-03T12:00:00Z'),
          status: TarefaStatus.Concluida,
        },
      ]);
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      // Mock do fetch para retornar uma resposta de erro
      jest.spyOn(global, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Erro interno do servidor',
      } as Response);
      
      // Verifica se a função lança um erro
      await expect(listarTodas()).rejects.toThrow(
        'Erro na requisição: 500 Erro interno do servidor'
      );
    });
  });

  describe('converterJsonParaTarefa', () => {
    it('deve converter corretamente um JSON para uma instância de Tarefa', () => {
      const json = {
        id: 1,
        titulo: 'Tarefa 1',
        descricao: 'Descrição da Tarefa 1',
        dataCriacao: '2023-10-01T10:00:00Z',
        dataConclusao: null,
        status: TarefaStatus.Pendente,
      };

      const tarefa = converterJsonParaTarefa(json);

      // Verifica se a conversão foi feita corretamente
      expect(tarefa).toEqual({
        id: 1,
        titulo: 'Tarefa 1',
        descricao: 'Descrição da Tarefa 1',
        dataCriacao: new Date('2023-10-01T10:00:00Z'),
        dataConclusao: null,
        status: TarefaStatus.Pendente,
      });
    });

    it('deve converter corretamente um JSON com data de conclusão para uma instância de Tarefa', () => {
      const json = {
        id: 2,
        titulo: 'Tarefa 2',
        descricao: 'Descrição da Tarefa 2',
        dataCriacao: '2023-10-02T11:00:00Z',
        dataConclusao: '2023-10-03T12:00:00Z',
        status: TarefaStatus.Concluida,
      };

      const tarefa = converterJsonParaTarefa(json);

      // Verifica se a conversão foi feita corretamente
      expect(tarefa).toEqual({
        id: 2,
        titulo: 'Tarefa 2',
        descricao: 'Descrição da Tarefa 2',
        dataCriacao: new Date('2023-10-02T11:00:00Z'),
        dataConclusao: new Date('2023-10-03T12:00:00Z'),
        status: TarefaStatus.Concluida,
      });
    });
  });
});
/**
 * Este arquivo contém testes para os métodos do serviço de Tarefa
 */

jest.mock('@/config', () => ({
  API_URL: 'mocked-api-url.com',
}));

import { describe, expect, it } from '@jest/globals'
import { API_URL } from '@/config';
import TarefaStatus from '@/modules/tarefa/enums/TarefaStatus.enum';
import * as TarefaService from '@/modules/tarefa/services/Tarefa.service';

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
          ordenacao: 1,
        },
        {
          id: 2,
          titulo: 'Tarefa 2',
          descricao: 'Descrição da Tarefa 2',
          dataCriacao: '2023-10-02T11:00:00Z',
          dataConclusao: '2023-10-03T12:00:00Z',
          status: TarefaStatus.Concluida,
          ordenacao: 1,
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
      const tarefas = await TarefaService.listarTodas();

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
          ordenacao: 1,
        },
        {
          id: 2,
          titulo: 'Tarefa 2',
          descricao: 'Descrição da Tarefa 2',
          dataCriacao: new Date('2023-10-02T11:00:00Z'),
          dataConclusao: new Date('2023-10-03T12:00:00Z'),
          status: TarefaStatus.Concluida,
          ordenacao: 1,
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
      await expect(TarefaService.listarTodas()).rejects.toThrow(
        'Erro na requisição: 500 Erro interno do servidor'
      );
    });
  });


  describe('atualizar', () => {
    it('deve atualizar uma tarefa e retornar a tarefa atualizada quando a requisição for bem-sucedida', async () => {
      // Mock da tarefa a ser atualizada
      const tarefaAtualizadaJson = {
        id: 1,
        titulo: 'Tarefa Atualizada',
        descricao: 'Descrição Atualizada',
        dataCriacao: '2023-10-01T10:00:00Z',
        dataConclusao: '2023-10-03T12:00:00Z',
        status: TarefaStatus.Concluida,
        ordenacao: 1,
      };

      // Mock do fetch para retornar uma resposta bem-sucedida
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => tarefaAtualizadaJson,
      } as Response);

      // Chama a função atualizar
      const tarefaAtualizada = await TarefaService.atualizar({
        id: 1,
        titulo: 'Tarefa Atualizada',
        descricao: 'Descrição Atualizada',
        dataCriacao: new Date('2023-10-01T10:00:00Z'),
        dataConclusao: new Date('2023-10-03T12:00:00Z'),
        status: TarefaStatus.Concluida,
        ordenacao: 1,
      });

      // Verifica se o fetch foi chamado com a URL e os parâmetros corretos
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/Tarefa/1`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          titulo: 'Tarefa Atualizada',
          descricao: 'Descrição Atualizada',
          dataCriacao: new Date('2023-10-01T10:00:00Z'),
          dataConclusao: new Date('2023-10-03T12:00:00Z'),
          status: TarefaStatus.Concluida,
          ordenacao: 1,

        }),
      });

      // Verifica se a tarefa atualizada foi retornada corretamente
      expect(tarefaAtualizada).toEqual({
        id: 1,
        titulo: 'Tarefa Atualizada',
        descricao: 'Descrição Atualizada',
        dataCriacao: new Date('2023-10-01T10:00:00Z'),
        dataConclusao: new Date('2023-10-03T12:00:00Z'),
        status: TarefaStatus.Concluida,
        ordenacao: 1,
      });
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      // Mock do fetch para retornar uma resposta de erro
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Erro interno do servidor',
      } as Response);

      // Verifica se a função lança um erro
      await expect(
        TarefaService.atualizar({
          id: 1,
          titulo: 'Tarefa Atualizada',
          descricao: 'Descrição Atualizada',
          dataCriacao: new Date('2023-10-01T10:00:00Z'),
          dataConclusao: new Date('2023-10-03T12:00:00Z'),
          status: TarefaStatus.Concluida,
          ordenacao: 1,
        })
      ).rejects.toThrow('Erro na requisição: 500 Erro interno do servidor');
    });
  });

  describe('salvarOrdenacao', () => {
    afterEach(() => {
      jest.restoreAllMocks(); // Limpa os mocks após cada teste
    });

    it('deve fazer uma requisição PUT com os dados corretos e não lançar erros quando a requisição for bem-sucedida', async () => {
      // Mock das ordenações a serem salvas
      const ordenacoes = [
        { id: 1, ordenacao: 2 },
        { id: 2, ordenacao: 1 },
      ];

      // Mock do fetch para retornar uma resposta bem-sucedida
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => ({}),
      } as Response);

      // Chama a função salvarOrdenacao
      await TarefaService.salvarOrdenacao(ordenacoes);

      // Verifica se o fetch foi chamado com a URL e os parâmetros corretos
      expect(fetch).toHaveBeenCalledWith(`${API_URL}/Tarefa/Ordenacao`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenacoes),
      });
    });

    it('deve lançar um erro quando a requisição falhar', async () => {
      // Mock das ordenações a serem salvas
      const ordenacoes = [
        { id: 1, ordenacao: 2 },
        { id: 2, ordenacao: 1 },
      ];

      // Mock do fetch para retornar uma resposta de erro
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Erro interno do servidor',
      } as Response);

      // Verifica se a função lança um erro
      await expect(TarefaService.salvarOrdenacao(ordenacoes)).rejects.toThrow(
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
        ordenacao: 1,
      };

      const tarefa = TarefaService.converterJsonParaTarefa(json);

      // Verifica se a conversão foi feita corretamente
      expect(tarefa).toEqual({
        id: 1,
        titulo: 'Tarefa 1',
        descricao: 'Descrição da Tarefa 1',
        dataCriacao: new Date('2023-10-01T10:00:00Z'),
        dataConclusao: null,
        status: TarefaStatus.Pendente,
        ordenacao: 1,
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
        ordenacao: 1,
      };

      const tarefa = TarefaService.converterJsonParaTarefa(json);

      // Verifica se a conversão foi feita corretamente
      expect(tarefa).toEqual({
        id: 2,
        titulo: 'Tarefa 2',
        descricao: 'Descrição da Tarefa 2',
        dataCriacao: new Date('2023-10-02T11:00:00Z'),
        dataConclusao: new Date('2023-10-03T12:00:00Z'),
        status: TarefaStatus.Concluida,
        ordenacao: 1,
      });
    });
  });
});
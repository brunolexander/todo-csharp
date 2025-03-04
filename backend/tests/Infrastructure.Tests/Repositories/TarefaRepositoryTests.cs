using Dapper;
using TodoBack.Domain.Entities;
using TodoBack.Infrastructure.Repositories;
using System.Transactions;
using TodoBack.Infrastructure.Tests.Fixtures;

namespace TodoBack.Infrastructure.Tests.Repositories;

/// <summary>
/// Testes de integração para o repositório de tarefas.
/// Garante que os métodos interagem corretamente com o banco de dados.
/// </summary>
public class TarefaRepositoryTests : IClassFixture<DatabaseFixture>
{
    private readonly TarefaRepository _tarefaRepository;
    private readonly DatabaseFixture _databaseFixture;

    /// <summary>
    /// Configura os serviços necessários para os testes.
    /// </summary>
    public TarefaRepositoryTests(DatabaseFixture databaseFixture)
    {
        _databaseFixture = databaseFixture;
        _tarefaRepository = new TarefaRepository(_databaseFixture);
     }

    /// <summary>
    /// Testa se o método Adicionar insere uma nova tarefa corretamente no banco de dados.
    /// </summary>
    [Fact]
    public async Task Adicionar_DeveInserirTarefaNoBanco()
    {
        // Preparação
        using var transacao = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        var novaTarefa = new Tarefa { Titulo = "Nova Tarefa", Status = Status.Pendente };

        // Ação
        novaTarefa = await _tarefaRepository.Adicionar(novaTarefa); // Assume que Adicionar é assíncrono

        // Verificação
        using var conexao = _databaseFixture.GetConnection();
        var tarefaNoBanco = await conexao.QueryFirstOrDefaultAsync<Tarefa>(
            "SELECT * FROM Tarefas WHERE Id = IDENT_CURRENT('Tarefas')"
        );

        Assert.NotNull(tarefaNoBanco);
        Assert.Equal(novaTarefa.Id, tarefaNoBanco.Id);
        Assert.Equal(novaTarefa.Titulo, tarefaNoBanco.Titulo);
        Assert.Equal(novaTarefa.Status, tarefaNoBanco.Status);

    }

    /// <summary>
    /// Testa se o método ObterPorId retorna corretamente uma tarefa pelo ID.
    /// </summary>
    [Fact]
    public async Task ObterPorId_DeveRetornarTarefaCorreta()
    {
        // Preparação
        using var transacao = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        using var conexao = _databaseFixture.GetConnection();
        var id = await conexao.ExecuteScalarAsync<int>(
            "INSERT INTO Tarefas (Titulo, Status) OUTPUT INSERTED.Id VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa Teste", Status = Status.EmProgresso });

        // Ação
        var tarefa = await _tarefaRepository.ObterPorId(id);

        // Verificação
        Assert.NotNull(tarefa);
        Assert.Equal(id, tarefa.Id);
        Assert.Equal("Tarefa Teste", tarefa.Titulo);
        Assert.Equal(Status.EmProgresso, tarefa.Status);
    }

    /// <summary>
    /// Testa se o método ObterPorStatus retorna corretamente as tarefas pelo status.
    /// </summary>
    [Fact]
    public async Task ObterPorStatus_DeveRetornarTarefasCorretas()
    {
        // Preparação
        using var transacao = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        using var conexao = _databaseFixture.GetConnection();
        await conexao.ExecuteAsync(
            "INSERT INTO Tarefas (Titulo, Status) VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa 1", Status = Status.Pendente.ToString() });
        await conexao.ExecuteAsync(
            "INSERT INTO Tarefas (Titulo, Status) VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa 2", Status = Status.EmProgresso.ToString() });
        await conexao.ExecuteAsync(
            "INSERT INTO Tarefas (Titulo, Status) VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa 3", Status = Status.Concluida.ToString() });

        // Ação
        var tarefasPendentes = await _tarefaRepository.ObterPorStatus(Status.Pendente);

        // Verificação
        Assert.NotNull(tarefasPendentes);
        Assert.Single(tarefasPendentes);
        Assert.All(tarefasPendentes, t => Assert.Equal(Status.Pendente, t.Status));
    }

    /// <summary>
    /// Testa se o método Atualizar modifica corretamente uma tarefa no banco de dados.
    /// </summary>
    [Fact]
    public async Task Atualizar_DeveModificarTarefaNoBanco()
    {
        // Preparação
        using var transacao = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        using var conexao = _databaseFixture.GetConnection();
        var id = await conexao.ExecuteScalarAsync<int>(
            "INSERT INTO Tarefas (Titulo, Status) OUTPUT INSERTED.Id VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa Original", Status = Status.Pendente });

        var tarefaAtualizada = new Tarefa { Id = id, Titulo = "Tarefa Alterada", Status = Status.Concluida };

        // Ação
        tarefaAtualizada = await _tarefaRepository.Atualizar(tarefaAtualizada);

        // Verificação
        var tarefaNoBanco = await conexao.QueryFirstOrDefaultAsync<Tarefa>(
            "SELECT * FROM Tarefas WHERE Id = @Id", new { Id = id });

        Assert.NotNull(tarefaNoBanco);
        Assert.Equal("Tarefa Alterada", tarefaNoBanco.Titulo);
        Assert.Equal(Status.Concluida, tarefaNoBanco.Status);
    }

    /// <summary>
    /// Testa se o método Remover exclui corretamente uma tarefa do banco de dados.
    /// </summary>
    [Fact]
    public async Task Remover_DeveExcluirTarefaNoBanco()
    {
        // Preparação
        using var conexao = _databaseFixture.GetConnection();
        var id = await conexao.ExecuteScalarAsync<int>(
            "INSERT INTO Tarefas (Titulo, Status) OUTPUT INSERTED.Id VALUES (@Titulo, @Status)",
            new { Titulo = "Tarefa a Deletar", Status = Status.Pendente });

        // Ação
        await _tarefaRepository.Remover(id);

        // Verificação
        var tarefaNoBanco = await conexao.QueryFirstOrDefaultAsync<Tarefa>(
            "SELECT * FROM Tarefas WHERE Id = @Id", new { Id = id });

        Assert.Null(tarefaNoBanco);
    }
}

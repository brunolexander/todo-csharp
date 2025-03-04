

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoBack.Domain.Entities;
using TodoBack.Presentation.Controllers;
using TodoBack.Application.Interfaces;
using TodoBack.Tests.Helpers;
using Moq;

namespace TodoBack.Presentation.Tests.Controllers
{
    public class TarefaControllerTests
    {
        /// <summary>
        /// Testa se a criação retorna 201 (Created) para uma tarefa válida.
        /// </summary>
        [Fact]
        public void Criar_Retorna201_SeValido()
        {           
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefa = new Tarefa
            {
                Titulo = "Nova tarefa",
                Descricao = "Descrição opcional"
            };

            controller.ValidarModel(tarefa);

            var result = controller.Criar(tarefa);

            var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(StatusCodes.Status201Created, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a criação retorna 400 (Bad Request) quando o título for nulo ou vazio.
        /// </summary>
        [Fact]
        public void Criar_Retorna400_SeTituloForNuloOuVazio()
        {
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);
            var tarefa = new Tarefa { Titulo = "" };

            controller.ValidarModel(tarefa);

            var result = controller.Criar(tarefa);

            var actionResult = Assert.IsType<BadRequestResult>(result.Result);
            Assert.Equal(StatusCodes.Status400BadRequest, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a criação retorna 400 (Bad Request) quando o título excede o comprimento máximo permitido.
        /// </summary>
        [Fact]
        public void Criar_Retorna400_SeTituloExcedeComprimentoMaximo()
        {
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);
            var tarefa = new Tarefa { Titulo = new string('A', 101) }; // Título com 101 caracteres

            controller.ValidarModel(tarefa);

            var result = controller.Criar(tarefa);

            var actionResult = Assert.IsType<BadRequestResult>(result.Result);
            Assert.Equal(StatusCodes.Status400BadRequest, actionResult.StatusCode);
        }

         /// <summary>
        /// Testa se a atualização retorna 200 (OK) para uma tarefa válida.
        /// </summary>
        [Fact]
        public async Task Atualizar_Retorna200_SeValidoAsync()
        {
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefaExistente = new Tarefa
            {
                Id = 1,
                Titulo = "Tarefa existente",
                Descricao = "Descrição existente"
            };

            var tarefaAtualizada = new Tarefa
            {
                Id = 1,
                Titulo = "Tarefa atualizada",
                Descricao = "Descrição atualizada"
            };

            // Configura o mock para retornar a tarefa existente
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync(tarefaExistente);
            mock.Setup(service => service.Atualizar(tarefaAtualizada)).ReturnsAsync(tarefaAtualizada);

            var result = await controller.Atualizar(1, tarefaAtualizada);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefaAtualizada, actionResult.Value);
        }

        /// <summary>
        /// Testa se a atualização retorna 400 (Bad Request) quando os dados são inválidos.
        /// </summary>
        [Fact]
        public async Task Atualizar_Retorna400_SeInvalido()
        {
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefa = new Tarefa
            {
                Id = 1,
                Titulo = "", // Título inválido (vazio)
                Descricao = "Descrição inválida"
            };

            controller.ValidarModel(tarefa);

            var result = await controller.Atualizar(1, tarefa);

            var actionResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(StatusCodes.Status400BadRequest, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a atualização retorna 404 (Not Found) quando a tarefa não existe.
        /// </summary>
        [Fact]
        public async Task Atualizar_Retorna404_SeNaoEncontrado()
        {
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefaAtualizada = new Tarefa
            {
                Id = 1,
                Titulo = "Tarefa atualizada",
                Descricao = "Descrição atualizada"
            };

            // Configura o mock para retornar null (tarefa não encontrada)
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync((Tarefa?)null);

            var result = await controller.Atualizar(1, tarefaAtualizada);

            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a exclusão retorna 200 (OK) quando a tarefa existe.
        /// </summary>
        [Fact]
        public async Task Excluir_Retorna200_SeExistirAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefaExistente = new Tarefa
            {
                Id = 1,
                Titulo = "Tarefa existente",
                Descricao = "Descrição existente"
            };

            // Configura o mock para retornar a tarefa existente
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync(tarefaExistente);

            // Act
            var result = await controller.Excluir(1);

            // Assert
            var actionResult = Assert.IsType<OkResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);

            // Verifica se o método Remover foi chamado
            mock.Verify(service => service.Remover(1), Times.Once);
        }

        /// <summary>
        /// Testa se a exclusão retorna 404 (Not Found) quando a tarefa não existe.
        /// </summary>
        [Fact]
        public async Task Excluir_Retorna404_SeNaoExistirAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            // Configura o mock para retornar null (tarefa não encontrada)
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync((Tarefa?)null);

            // Act
            var result = await controller.Excluir(1);

            // Assert
            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, actionResult.StatusCode);

            // Verifica se o método Remover NÃO foi chamado
            mock.Verify(service => service.Remover(1), Times.Never);
        }

        /// <summary>
        /// Testa se a listagem de todas as tarefas retorna 200 (OK) com a lista de tarefas.
        /// </summary>
        [Fact]
        public async Task ListarTodas_Retorna200_ComListaDeTarefasAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefas = new List<Tarefa>
            {
                new() { Id = 1, Titulo = "Tarefa 1" },
                new() { Id = 2, Titulo = "Tarefa 2" }
            };

            // Configura o mock para retornar a lista de tarefas
            mock.Setup(service => service.ObterTodas()).ReturnsAsync(tarefas);

            // Act
            var result = await controller.ListarTodas();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefas, actionResult.Value);
        }

        /// <summary>
        /// Testa se a listagem de uma tarefa específica retorna 200 (OK) com a tarefa encontrada.
        /// </summary>
        [Fact]
        public async Task ListarPorId_Retorna200_SeTarefaExistirAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefa = new Tarefa { Id = 1, Titulo = "Tarefa 1" };

            // Configura o mock para retornar a tarefa específica
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync(tarefa);

            // Act
            var result = await controller.ListarTodas(1);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefa, actionResult.Value);
        }

        /// <summary>
        /// Testa se a listagem de uma tarefa específica retorna 404 (Not Found) se a tarefa não existir.
        /// </summary>
        [Fact]
        public async Task ListarPorId_Retorna404_SeTarefaNaoExistirAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            // Configura o mock para retornar null (tarefa não encontrada)
            mock.Setup(service => service.ObterPorId(1)).ReturnsAsync((Tarefa?)null);

            // Act
            var result = await controller.ListarTodas(1);

            // Assert
            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, actionResult.StatusCode);
        }
                
        /// <summary>
        /// Testa se a filtragem de tarefas por status retorna 200 (OK) com a lista de tarefas corretamente filtrada.
        /// </summary>
        [Fact]
        public async Task FiltrarTarefasPorStatus_Retorna200_ComTarefasFiltradasAsync()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var statusParaFiltrar = Status.Concluida;

            // Cria uma lista de tarefas com status diferentes
            var todasTarefas = new List<Tarefa>
            {
                new() { Id = 1, Titulo = "Tarefa 1", Status = Status.Concluida },
                new() { Id = 2, Titulo = "Tarefa 2", Status = Status.Pendente },
                new() { Id = 3, Titulo = "Tarefa 3", Status = Status.Concluida },
                new() { Id = 4, Titulo = "Tarefa 4", Status = Status.EmProgresso }
            };

            // Filtra as tarefas manualmente para usar como resultado esperado
            var tarefasFiltradasEsperadas = todasTarefas.Where(t => t.Status == statusParaFiltrar).ToList();

            // Configura o mock para retornar as tarefas filtradas
            mock.Setup(service => service.ObterPorStatus(statusParaFiltrar)).ReturnsAsync(tarefasFiltradasEsperadas);

            // Act
            var result = await controller.ListarTodas(statusParaFiltrar);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);

            // Verifica se as tarefas retornadas correspondem às tarefas filtradas esperadas
            var tarefasRetornadas = Assert.IsType<List<Tarefa>>(actionResult.Value);
            Assert.Equal(tarefasFiltradasEsperadas, tarefasRetornadas);
        }
    }
}


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
        public void Atualizar_Retorna200_SeValido()
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
            mock.Setup(service => service.ObterPorId(1)).Returns(tarefaExistente);

            var result = controller.Atualizar(1, tarefaAtualizada);

            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefaAtualizada, actionResult.Value);
        }

        /// <summary>
        /// Testa se a atualização retorna 400 (Bad Request) quando os dados são inválidos.
        /// </summary>
        [Fact]
        public void Atualizar_Retorna400_SeInvalido()
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

            var result = controller.Atualizar(1, tarefa);

            var actionResult = Assert.IsType<BadRequestResult>(result);
            Assert.Equal(StatusCodes.Status400BadRequest, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a atualização retorna 404 (Not Found) quando a tarefa não existe.
        /// </summary>
        [Fact]
        public void Atualizar_Retorna404_SeNaoEncontrado()
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
            mock.Setup(service => service.ObterPorId(1)).Returns((Tarefa?)null);

            var result = controller.Atualizar(1, tarefaAtualizada);

            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, actionResult.StatusCode);
        }

        /// <summary>
        /// Testa se a exclusão retorna 200 (OK) quando a tarefa existe.
        /// </summary>
        [Fact]
        public void Excluir_Retorna200_SeExistir()
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
            mock.Setup(service => service.ObterPorId(1)).Returns(tarefaExistente);

            // Act
            var result = controller.Excluir(1);

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
        public void Excluir_Retorna404_SeNaoExistir()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            // Configura o mock para retornar null (tarefa não encontrada)
            mock.Setup(service => service.ObterPorId(1)).Returns((Tarefa?)null);

            // Act
            var result = controller.Excluir(1);

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
        public void ListarTodas_Retorna200_ComListaDeTarefas()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefas = new List<Tarefa>
            {
                new Tarefa { Id = 1, Titulo = "Tarefa 1" },
                new Tarefa { Id = 2, Titulo = "Tarefa 2" }
            };

            // Configura o mock para retornar a lista de tarefas
            mock.Setup(service => service.ObterTodas()).Returns(tarefas);

            // Act
            var result = controller.ListarTodas();

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefas, actionResult.Value);
        }

        /// <summary>
        /// Testa se a listagem de uma tarefa específica retorna 200 (OK) com a tarefa encontrada.
        /// </summary>
        [Fact]
        public void ListarTodas_Retorna200_SeTarefaExistir()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            var tarefa = new Tarefa { Id = 1, Titulo = "Tarefa 1" };

            // Configura o mock para retornar a tarefa específica
            mock.Setup(service => service.ObterPorId(1)).Returns(tarefa);

            // Act
            var result = controller.ListarTodas(1);

            // Assert
            var actionResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(StatusCodes.Status200OK, actionResult.StatusCode);
            Assert.Equal(tarefa, actionResult.Value);
        }

        /// <summary>
        /// Testa se a listagem de uma tarefa específica retorna 404 (Not Found) se a tarefa não existir.
        /// </summary>
        [Fact]
        public void ListarTodas_Retorna404_SeTarefaNaoExistir()
        {
            // Arrange
            var mock = new Mock<ITarefaService>();
            var controller = new TarefaController(mock.Object);

            // Configura o mock para retornar null (tarefa não encontrada)
            mock.Setup(service => service.ObterPorId(1)).Returns((Tarefa?)null);

            // Act
            var result = controller.ListarTodas(1);

            // Assert
            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(StatusCodes.Status404NotFound, actionResult.StatusCode);
        }
    }
}
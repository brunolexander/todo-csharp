

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
    }
}
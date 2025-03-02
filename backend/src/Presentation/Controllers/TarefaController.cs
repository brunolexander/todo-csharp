using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TodoBack.Application.Interfaces;
using TodoBack.Domain.Entities;

namespace TodoBack.Presentation.Controllers
{
    /// <summary>
    /// Controlador para operações de tarefas.
    /// </summary>
    [Route("api/[controller]")] // Rota base: api/tarefa
    [ApiController]
    public class TarefaController(ITarefaService tarefaService) : ControllerBase
    {
        private readonly ITarefaService _tarefaService = tarefaService;

        /// <summary>
        /// Cria uma nova tarefa.
        /// </summary>
        /// <param name="tarefa">Dados da tarefa.</param>
        /// <returns>
        /// 201 (Created) com a tarefa criada.
        /// 400 (Bad Request) se os dados forem inválidos.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [SwaggerOperation(Summary = "Cria uma nova tarefa")]
        public ActionResult<Tarefa> Criar([FromBody] Tarefa tarefa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _tarefaService.Adicionar(tarefa);

            return CreatedAtAction(nameof(Criar), tarefa);
        }

        /// <summary>
        /// Atualiza uma tarefa existente.
        /// </summary>
        /// <param name="id">ID da tarefa a ser atualizada.</param>
        /// <param name="tarefa">Dados da tarefa atualizados.</param>
        /// <returns>
        /// 200 (OK) se a atualização for bem-sucedida.
        /// 400 (Bad Request) se os dados forem inválidos.
        /// 404 (Not Found) se a tarefa não for encontrada.
        /// </returns>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Atualiza uma tarefa existente")]
        public IActionResult Atualizar(int id, [FromBody] Tarefa tarefa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var tarefaExistente = _tarefaService.ObterPorId(id);
            if (tarefaExistente == null)
            {
                return NotFound();
            }

            tarefa.Id = id;
            _tarefaService.Atualizar(tarefa);

            return Ok(tarefa);
        }

        /// <summary>
        /// Exclui uma tarefa existente.
        /// </summary>
        /// <param name="id">ID da tarefa a ser excluída.</param>
        /// <returns>
        /// 200 (OK) se a exclusão for bem-sucedida.
        /// 404 (Not Found) se a tarefa não for encontrada.
        /// </returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Exclui uma tarefa existente")]
        public IActionResult Excluir(int id)
        {
            var tarefaExistente = _tarefaService.ObterPorId(id);
            if (tarefaExistente == null)
            {
                return NotFound();
            }

            _tarefaService.Remover(id);

            return Ok();
        }

        /// <summary>
        /// Lista todas as tarefas.
        /// </summary>
        /// <returns>200 (OK) com a lista de tarefas.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [SwaggerOperation(Summary = "Lista todas as tarefas")]
        public IActionResult ListarTodas()
        {
            var tarefas = _tarefaService.ObterTodas();
            return Ok(tarefas); // Retorna 200 com a lista de tarefas
        }

        /// <summary>
        /// Lista uma tarefa específica pelo ID.
        /// </summary>
        /// <param name="id">ID da tarefa.</param>
        /// <returns>
        /// 200 (OK) com a tarefa encontrada.
        /// 404 (Not Found) se a tarefa não for encontrada.
        /// </returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Lista uma tarefa específica pelo ID")]
        public IActionResult ListarTodas(int id)
        {
            var tarefa = _tarefaService.ObterPorId(id);
            if (tarefa == null)
            {
                return NotFound(); // Retorna 404 se a tarefa não for encontrada
            }
            return Ok(tarefa); // Retorna 200 com a tarefa encontrada
        }
    }
}
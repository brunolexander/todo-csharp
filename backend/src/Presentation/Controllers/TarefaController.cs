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
        [Produces("application/json")]
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
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Atualiza uma tarefa existente")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] Tarefa tarefa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var tarefaExistente  = await _tarefaService.ObterPorId(id);
            if (tarefaExistente == null)
            {
                return NotFound();
            }

            tarefa.Id = id;
            var tarefaAtualizada = await _tarefaService.Atualizar(tarefa);

            return Ok(tarefaAtualizada);
        }

       
        /// <summary>
        /// Salva a ordenação das tarefas.
        /// </summary>
        /// <param name="ordenacoes">Lista de objetos contendo o ID da tarefa e sua nova ordenação.</param>
        /// <returns>
        /// 200 (OK) se a ordenação for salva com sucesso.
        /// 400 (Bad Request) se os dados forem inválidos.
        /// </returns>
        [HttpPut("Ordenacao")]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [SwaggerOperation(Summary = "Salva a ordenação das tarefas")]
        public async Task<IActionResult> SalvarOrdenacao([FromBody] List<OrdenacaoTarefa> ordenacoes)
        {
            await _tarefaService.SalvarOrdenacao(ordenacoes);

            return Ok();
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
        public async Task<IActionResult> Excluir(int id)
        {
            var tarefaExistente = await _tarefaService.ObterPorId(id);
            if (tarefaExistente == null)
            {
                return NotFound();
            }

            await _tarefaService.Remover(id);

            return Ok();
        }

        /// <summary>
        /// Lista todas as tarefas.
        /// </summary>
        /// <returns>200 (OK) com a lista de tarefas.</returns>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Tarefa>))]
        [SwaggerOperation(Summary = "Lista todas as tarefas")]
        public async Task<IActionResult> ListarTodas([FromQuery] Status? status = null)
        {
            var tarefas = (status == null)
                ? await _tarefaService.ObterTodas() 
                : await _tarefaService.ObterPorStatus((Status)status);

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
        [Produces("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [SwaggerOperation(Summary = "Lista uma tarefa específica pelo ID")]
        public async Task<IActionResult> ListarTodas(int id)
        {
            var tarefa = await _tarefaService.ObterPorId(id);
            if (tarefa == null)
            {
                return NotFound(); // Retorna 404 se a tarefa não for encontrada
            }
            return Ok(tarefa); // Retorna 200 com a tarefa encontrada
        }
    }
}
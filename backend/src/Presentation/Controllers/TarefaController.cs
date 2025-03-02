using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoBack.Application.Interfaces;
using TodoBack.Domain.Entities;

namespace TodoBack.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController(ITarefaService tarefaService) : ControllerBase
    {
        ITarefaService _tarefaService = tarefaService;

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Tarefa> Criar([FromBody] Tarefa tarefa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _tarefaService.Adicionar(tarefa);
            
            return CreatedAtAction(nameof(Criar), tarefa);
        }
    }
}
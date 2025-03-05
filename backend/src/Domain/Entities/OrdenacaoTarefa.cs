using System.ComponentModel.DataAnnotations;

namespace TodoBack.Domain.Entities
{
    public class OrdenacaoTarefa
    {
        /// <summary>
        /// ID da tarefa.
        /// </summary>
        [Key]
        public int Id { get; set; }

        // <summary>
        // Ordem da tarefa
        // </summary>
        [Required]
        public int Ordenacao { get; set; }
    }
}
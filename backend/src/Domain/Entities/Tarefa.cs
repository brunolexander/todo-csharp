using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TodoBack.Domain.Validation;

namespace TodoBack.Domain.Entities
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        Pendente,
        EmProgresso,
        Concluida
    }

    /// <summary>
    /// Representa a entidade de tarefa.
    /// </summary>
    public class Tarefa
    {
        /// <summary>
        /// Chave primária.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Título obrigatório e com limite de 100 caracteres.
        /// </summary>
        [Required]
        [MaxLength(100)]
        [MinLength(1)]
        public string Titulo { get; set; } = string.Empty;

        /// <summary>
        /// Descrição opcional.
        /// </summary>
        public string? Descricao { get; set; }

        /// <summary>
        /// Data de criação, inicializada com a data atual.
        /// </summary>
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
        
        /// <summary>
        /// Data de exclusão
        /// </summary>
        public DateTime? DataExclusao { get; set; }

        /// <summary>
        /// Data de conclusão, deve ser maior que a data de criação.
        /// </summary>
        /// <example>2025-03-03T16:14:58.016Z</example>
        [DataMaiorQue(nameof(DataCriacao))]
        public DateTime? DataConclusao { get; set; }

        /// <summary>
        /// Status atual, inicializado como pendente.
        /// </summary>
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Status Status { get; set; } = Status.Pendente;

        /// <summary>
        /// Ordem da tarefa.
        /// </summary>
        public int Ordenacao { get; set; }
    }
}

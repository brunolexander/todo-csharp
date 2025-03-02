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
        // Chave primária
        [Key]
        public int Id { get; set; }

        // Título obrigatório e com limite de 100 caracteres
        [Required]
        [MaxLength(100)]
        [MinLength(1)]
        public string Titulo { get; set; } = string.Empty;

        // Descrição, opcional
        public string? Descricao { get; set; }

        // Data de criação, inicializada com a data atual
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        // Data de conclusão, deve ser maior que a data de criação
        [DataMaiorQue(nameof(DataCriacao))]
        public DateTime? DataConclusao { get; set; }

        // Status atual, inicializado como pendente
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Status Status { get; set; } = Status.Pendente;
    }
};
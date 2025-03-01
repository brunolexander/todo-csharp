using System.ComponentModel.DataAnnotations;

namespace Domain;

/// <summary>
/// Atributo de validação para garantir que uma data seja maior que outra.
/// </summary>
public class DataMaiorQueAttribute : ValidationAttribute
{
    private readonly string _nomeCampoComparacao;

    /// <summary>
    /// Constrói o atributo com o nome do campo para comparação.
    /// </summary>
    /// <param name="nomeCampoComparacao">Nome do campo a ser comparado.</param>
    public DataMaiorQueAttribute(string nomeCampoComparacao)
    {
        _nomeCampoComparacao = nomeCampoComparacao;
    }

    /// <summary>
    /// Verifica se a data é válida com base na comparação.
    /// </summary>
    /// <param name="valor">Valor da data a ser validada.</param>
    /// <param name="context">Contexto de validação.</param>
    /// <returns>Resultado da validação.</returns>
    protected override ValidationResult? IsValid(object? valor, ValidationContext context)
    {
        if (valor == null)
        {
            // Não validar se o valor for nulo
            return ValidationResult.Success;
        }

        // Obter o tipo do objeto sendo validado
        var tipoObjeto = context.ObjectInstance.GetType();

        // Localizar a propriedade para comparação
        var propriedadeComparacao = tipoObjeto.GetProperty(_nomeCampoComparacao);

        if (propriedadeComparacao == null)
        {
            // Retornar erro se a propriedade não for encontrada
            return new ValidationResult($"Propriedade '{_nomeCampoComparacao}' não encontrada.");
        }

        // Obter o valor da propriedade para comparação
        var valorComparacao = propriedadeComparacao.GetValue(context.ObjectInstance) as DateTime?;
        
        if (valor is DateTime dataAtual && valorComparacao.HasValue)
        {
            // Verificar se a data atual é menor ou igual à data de comparação
            var diferenca = dataAtual - valorComparacao.Value;
            if (diferenca.Seconds <= 0)
            {
                // Retornar erro se a data não for maior
                return new ValidationResult($"O campo {context.MemberName} deve ser maior que {_nomeCampoComparacao}.");
            }
        }

        // Retornar sucesso se a data for válida
        return ValidationResult.Success;
    }
}

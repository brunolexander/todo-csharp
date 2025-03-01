using System;
using System.ComponentModel.DataAnnotations;
using Xunit;

namespace Domain.Tests;

/// <summary>
/// Testes para a validação do atributo DataMaiorQueAttribute.
/// </summary>
public class DataMaiorQueAttributeTests
{
    /// <summary>
    /// Classe modelo para os testes.
    /// </summary>
    private class TesteModelo
    {
        /// <summary>
        /// Data inicial para comparação.
        /// </summary>
        public DateTime DataInicial { get; set; }
        
        /// <summary>
        /// Data final que deve ser maior que a DataInicial.
        /// </summary>
        [DataMaiorQue("DataInicial")]
        public DateTime DataFinal { get; set; }
    }

    /// <summary>
    /// Testa se a validação passa quando a DataFinal é maior que a DataInicial.
    /// </summary>
    [Fact]
    public void Sucesso_Quando_DataFinal_Maior()
    {
        var modelo = new TesteModelo
        {
            DataInicial = DateTime.Now,
            DataFinal = DateTime.Now.AddDays(1)
        };

        var contexto = new ValidationContext(modelo) { MemberName = nameof(TesteModelo.DataFinal) };
        var resultado = new DataMaiorQueAttribute("DataInicial").GetValidationResult(modelo.DataFinal, contexto);

        Assert.Equal(ValidationResult.Success, resultado);
    }

    /// <summary>
    /// Testa se a validação falha quando a DataFinal é menor ou igual à DataInicial.
    /// </summary>
    [Fact]
    public void Erro_Quando_DataFinal_Menor_Ou_Igual()
    {
        var modelo = new TesteModelo
        {
            DataInicial = DateTime.Now,
            DataFinal = DateTime.Now
        };

        var contexto = new ValidationContext(modelo) { MemberName = nameof(TesteModelo.DataFinal) };
        var resultado = new DataMaiorQueAttribute("DataInicial").GetValidationResult(modelo.DataFinal, contexto);
        
        Assert.NotNull(resultado);
        Assert.Contains("O campo DataFinal deve ser maior que DataInicial.", resultado.ErrorMessage);
    }

    /// <summary>
    /// Testa se a validação falha quando a propriedade de comparação não existe.
    /// </summary>
    [Fact]
    public void Erro_Quando_Propriedade_Inexistente()
    {
        var modelo = new TesteModelo
        {
            DataInicial = DateTime.Now,
            DataFinal = DateTime.Now.AddDays(1)
        };

        var contexto = new ValidationContext(modelo) { MemberName = nameof(TesteModelo.DataFinal) };
        var resultado = new DataMaiorQueAttribute("PropriedadeInexistente").GetValidationResult(modelo.DataFinal, contexto);

        Assert.NotNull(resultado);
        Assert.Contains("Propriedade 'PropriedadeInexistente' não encontrada.", resultado.ErrorMessage);
    }
}
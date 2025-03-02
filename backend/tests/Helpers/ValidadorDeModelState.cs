using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace TodoBack.Tests.Helpers
{
    public static class ValidadorDeModelState
    {
        /// <summary>
        /// Adiciona erros de validação ao ModelState do controller com base nas anotações de dados do modelo.
        /// </summary>
        public static void ValidarModel(this ControllerBase controller, object model)
        {
            var erros = new List<ValidationResult>();
            var contexto = new ValidationContext(model);
            Validator.TryValidateObject(model, contexto, erros, true);

            foreach (var erro in erros)
            {
                foreach (var campo in erro.MemberNames)
                {
                    controller.ModelState.AddModelError(campo, erro.ErrorMessage ?? "Erro de validação.");
                }
            }
        }
    }
}
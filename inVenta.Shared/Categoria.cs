using System;
using System.ComponentModel.DataAnnotations;

namespace inVenta.Shared
{
    public class Categoria
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required(ErrorMessage = "El nombre de la categoría es obligatorio.")]
        [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
        public string Nombre { get; set; } = string.Empty;
        public bool EstadoActivo { get; set; } = true;
        public bool Sincronizado { get; set; } = false;
        public DateTime FechaActualizacion {  get; set; } = DateTime.UtcNow;
    }
}

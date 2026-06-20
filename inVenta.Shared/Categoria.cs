using System;

namespace inVenta.Shared
{
    public class Categoria
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Nombre { get; set; } = string.Empty;
        public bool EstadoActivo { get; set; } = true;
        public bool Sincronizado { get; set; } = false;
        public DateTime FechaActualizacion {  get; set; } = DateTime.UtcNow;
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using inVenta.Api.Data;
using inVenta.Shared;

namespace inVenta.Api.Controllers
{
    [ApiController] //indica que esta clase es un controlador de API
    //decorador
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/categorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await _context.Categorias.Where(c => c.EstadoActivo).ToListAsync();
        }

        // GET /api/categorias/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategoria(string id)
        {
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id && c.EstadoActivo);

            if (categoria is null)
                return NotFound();

            return categoria;
        }

        // POST /api/categorias PREGUNTAR A GEMINI SI DEJAR EL TRY CATCH O NO
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoriaDuplicada = await _context.Categorias.AnyAsync(c => c.Nombre == categoria.Nombre && c.EstadoActivo);

            if (categoriaDuplicada)
            {
                return Conflict($"Ya existe una categoría llamada '{categoria.Nombre}'.");
            }

            _context.Categorias.Add(categoria);

            try

            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Error al guardar en la base de datos.");
            }

            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Producto>> PutCategoria(string id, Categoria categoriaData)
        {
            //revisamos que la categoria exista y este activa
            var categoria = await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id && c.EstadoActivo);
            if (categoria is null)
                return NotFound();

            //revisamos que el nombre no se duplique con otra categoria activa
            var duplicado = await _context.Categorias.AnyAsync(c => c.Nombre == categoriaData.Nombre && c.Id != id && c.EstadoActivo);
            if (duplicado)
                return Conflict($"Ya existe una categoría activa llamada '{categoriaData.Nombre}'.");

            categoria.Nombre = categoriaData.Nombre;
            categoria.Sincronizado = false;
            categoria.FechaActualizacion = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(categoria);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(string id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria is null || !categoria.EstadoActivo)
                return NotFound();

            categoria.EstadoActivo = false;
            categoria.Sincronizado = false;
            categoria.FechaActualizacion = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
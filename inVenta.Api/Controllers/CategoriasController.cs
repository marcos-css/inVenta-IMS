using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using inVenta.Api.Data;
using inVenta.Shared;

namespace inVenta.Api.Controllers
{
    [ApiController]
    // definimos la url base. "[controller]" se reemplaza por el nombre antes de "Controller", o sea: /api/categorias
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        //endpoint getcategorias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategorias()
        {
            return await _context.Categorias.ToListAsync(); //trae todas las categorias de la db y las pasa a una lista
        }

        // endpoint crear categoría /api/categorias
        [HttpPost]
        public async Task<ActionResult<Categoria>> PostCategoria(Categoria categoria)
        {
            // Agrega la categoría a la memoria
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync(); //guarda los datos en bd

            // devuelve un 201 y el objeto que se acaba de crear
            return CreatedAtAction(nameof(GetCategorias), new { id = categoria.Id }, categoria);
        }
    }
}
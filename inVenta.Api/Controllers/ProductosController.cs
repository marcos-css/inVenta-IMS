using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using inVenta.Api.Data;
using inVenta.Shared;

namespace inVenta.Api.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }
        // GET /api/productos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.Include(p => p.Categoria).Where(p => p.EstadoActivo).ToListAsync();
        }

        //GET /api/productos/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(string id)
        {
            var producto = await _context.Productos.Include(p => p.Categoria).FirstOrDefaultAsync(p => p.Id == id && p.EstadoActivo);

            if (producto is null)
                return NotFound();

            return producto;
        }
        //POST /api/productos
        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(Producto producto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var categoriaExiste = await _context.Categorias.AnyAsync(c => c.Id == producto.CategoriaId && c.EstadoActivo);
            if (!categoriaExiste)
                return BadRequest($"Error: La categoría con ID {producto.CategoriaId} no existe o está inactiva.");

            var productoDuplicado = await _context.Productos
                .AnyAsync(p => p.Nombre == producto.Nombre
                            && p.Marca == producto.Marca
                            && p.EstadoActivo);

            if (productoDuplicado)
            {
                return Conflict($"Error: Ya existe un producto activo llamado '{producto.Nombre}' de la marca '{producto.Marca}'.");
            }

            _context.Productos.Add(producto);

            try

            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Error al guardar en la base de datos.");
            }

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Producto>> PutProducto(string id, Producto productoData)
        {
            //revisamos que el producto exista y esté activo
            var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Id == id && p.EstadoActivo);
            if (producto is null)
                return NotFound();

            //revisamos si la nueva categoría existe y está activa
            var categoriaExiste = await _context.Categorias.AnyAsync(c => c.Id == productoData.CategoriaId && c.EstadoActivo);
            if (!categoriaExiste)
                return BadRequest($"Error: La categoría con ID {productoData.CategoriaId} no existe o está inactiva.");

            var duplicado = await _context.Productos.
                AnyAsync(p => p.Id != id
                            && p.Nombre == productoData.Nombre
                            && p.Marca == productoData.Marca
                            && p.EstadoActivo);
            if (duplicado)
            {
                return Conflict($"Error: Ya existe un producto activo llamado '{productoData.Nombre}' de la marca '{productoData.Marca}'.");
            }

            producto.Nombre = productoData.Nombre;
            producto.Marca = productoData.Marca;
            producto.Precio = productoData.Precio;
            producto.CategoriaId = productoData.CategoriaId;
            producto.Sincronizado = false;
            producto.FechaActualizacion = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(producto);


        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(string id)
        {
            var producto = await _context.Productos.FirstOrDefaultAsync(p => p.Id == id && p.EstadoActivo);
            if (producto is null)
                return NotFound();

            producto.EstadoActivo = false;
            producto.Sincronizado = false;
            producto.FechaActualizacion = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
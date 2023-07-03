using Compras.Data;
using Compras.Models;
using Compras.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Compras.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {

        private readonly AppDbContext _context;

        public ProdutosController([FromServices] AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var produtos = await _context.Produtos
                    .AsNoTracking()
                    .ToListAsync();

            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] int id
        )
        {

            var produto = await _context.Produtos.FirstOrDefaultAsync(produto => produto.Id == id);

            if (produto == null)
            {
                return NotFound(new Dictionary<string, string>()
                {
                    { "message", "Produto não encontrado!" }
                });
            }

            return Ok(produto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(
            [FromBody] ProdutoViewModel produtoView
        )
        {

            if (produtoView.Preco <= 0)
            {
                return UnprocessableEntity();
            }

            var newProdct = new Produto {
                Nome = produtoView.Nome,
                Descricao = produtoView.Descricao,
                Preco = produtoView.Preco
            };

            await _context.Produtos.AddAsync(newProdct);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateByIdAsync(
            [FromBody] ProdutoViewModel produtoView,
            [FromRoute] int id
        )
        {

            var productExists = await _context.Produtos.FirstOrDefaultAsync(produto => produto.Id == id);
            if (productExists == null)
            {
                return NotFound();
            }

            productExists.Nome = (produtoView.Nome != "") ? produtoView.Nome : productExists.Nome;
            productExists.Descricao = (produtoView.Descricao != "") ? produtoView.Descricao : productExists.Descricao;
            productExists.Preco = (Convert.ToBoolean(produtoView.Preco)) ? produtoView.Preco : productExists.Preco;

            try
            {
                _context.Produtos.Update(productExists);
                await _context.SaveChangesAsync();


                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteByIdAsync(
            [FromRoute] int id
        )
        {
            var productExists = await _context.Produtos.FirstOrDefaultAsync(produto => produto.Id == id);
            if (productExists == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(productExists);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

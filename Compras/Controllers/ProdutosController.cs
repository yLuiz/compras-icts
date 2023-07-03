using Compras.Data;
using Compras.Models;
using Compras.Services;
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

        private readonly ProdutoService _produtoService;

        public ProdutosController(
            [FromServices] ProdutoService produtoService
        )
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var produtos = await _produtoService.GetAllAsync();

            return Ok(produtos);
        }


        
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] int id
        )
        {

            var produto = await _produtoService.GetByIdAsync(id);

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

            await _produtoService.CreateAsync(newProdct);

            return Ok();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateByIdAsync(
            [FromBody] ProdutoViewModel produtoView,
            [FromRoute] int id
        )
        {

            var productExists = await _produtoService.GetByIdAsync(id);
            if (productExists == null)
            {
                return NotFound();
            }

            productExists.Nome = (produtoView.Nome != "") ? produtoView.Nome : productExists.Nome;
            productExists.Descricao = (produtoView.Descricao != "") ? produtoView.Descricao : productExists.Descricao;
            productExists.Preco = (Convert.ToBoolean(produtoView.Preco)) ? produtoView.Preco : productExists.Preco;

            try
            {
                await _produtoService.UpdateAsync(productExists);

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
            var productExists = await _produtoService.GetByIdAsync(id);
            if (productExists == null)
            {
                return NotFound();
            }

            await _produtoService.DeleteByIdAsync(productExists);

            return Ok();
        }
    }
}

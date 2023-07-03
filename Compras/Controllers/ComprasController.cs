using Compras.Data;
using Compras.Models;
using Compras.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.ObjectModel;

namespace Compras.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : ControllerBase
    {

        private readonly AppDbContext _context;
        public ComprasController(
            [FromServices] AppDbContext context
        ) { 
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(
            [FromServices] AppDbContext context
        )
        {

            var compras = await context.Compras
                .AsNoTracking()
                .Select(compra => new
                {
                    compra.Id,
                    compra.Status,
                    compra.Tipo_pagamento,
                    compra.Total,
                    produtos = compra.Produtos.Select(produto => new
                    {
                        produto.Id,
                        produto.Nome,
                        produto.Preco,
                        produto.Descricao,
                        produto.Data_criacao,
                        produto.Data_atualizacao
                    })
                })
                .ToListAsync();

            return Ok(compras);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] int id
        )
        {
            var compra = await _context.Compras
                .Include(compra => compra.Produtos)
                .FirstOrDefaultAsync(compra => compra.Id == id);

            if (compra == null)
            {
                return NotFound();
            }

            return Ok(compra);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync(
            [FromBody] CompraViewModel compraView
        )
        {
            var produtos = await _context.Produtos.Where(produto => compraView.Produtos!.Contains(produto.Id))
                .ToListAsync();

            List<int> produtosIds = new();
            double precoTotalProdutos = 0;

            produtos.ForEach(p =>
            {
                produtosIds.Add(p.Id);
                precoTotalProdutos += p.Preco;
            });

            if (compraView.Tipo_pagamento != "boleto")
            {
                compraView.Status = "aprovado";
            }

            if (compraView.Produtos == null)
            {
                return UnprocessableEntity();
            }

            var newCompra = new Compra
            {
                Tipo_pagamento = compraView.Tipo_pagamento,
                Status = compraView.Status,
                Total = precoTotalProdutos,
                Produtos = produtos
            };

            var compraRegistrada = await _context.Compras.AddAsync(newCompra);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateByIdAsync(
            [FromBody] CompraViewModel compraView,
            [FromRoute] int id
        )
        {
            var compraExists = await _context.Compras.FirstOrDefaultAsync(compra => compra.Id == id);

            if (compraExists == null)
            {
                return NotFound();
            }

            compraExists.Status = compraView.Status;
            compraExists.Tipo_pagamento = compraView.Tipo_pagamento;

            _context.Compras.Update(compraExists);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteByIdAsync(
            [FromRoute] int id
        )
        {

            var compraExists = await _context.Compras.FirstOrDefaultAsync(compra => compra.Id == id);

            if (compraExists == null)
            {
                return NotFound();
            }

            _context.Compras.Remove(compraExists);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

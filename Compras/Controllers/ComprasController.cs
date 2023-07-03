using Compras.Data;
using Compras.Models;
using Compras.Services;
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

        private readonly ComprasService _comprasService;
        private readonly ProdutoService _produtoService;
        public ComprasController(
            [FromServices] ComprasService comprasService,
            [FromServices] ProdutoService produtoService
        ) {
            _comprasService = comprasService;
            _produtoService = produtoService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {

            var compras = await _comprasService.GetAllAsync();

            return Ok(compras);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromRoute] int id
        )
        {
            var compra = await _comprasService.GetByIdAsync(id);

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
            var produtos = await _produtoService.GetManyByIds(compraView.Produtos!);

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

            await _comprasService.CreateAsync(newCompra);

            return Ok();
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateByIdAsync(
            [FromBody] CompraViewModel compraView,
            [FromRoute] int id
        )
        {
            var compraExists = await _comprasService.GetByIdAsync(id);

            if (compraExists == null)
            {
                return NotFound();
            }

            compraExists.Status = compraView.Status;
            compraExists.Tipo_pagamento = compraView.Tipo_pagamento;

            await _comprasService.UpdateAsync(compraExists);

            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteByIdAsync(
            [FromRoute] int id
        )
        {

            var compraExists = await _comprasService.GetByIdAsync(id);
             
            if (compraExists == null)
            {
                return NotFound();
            }

            await _comprasService.DeleteAsync(compraExists);

            return Ok();
        }
        /*

        */
    }
}

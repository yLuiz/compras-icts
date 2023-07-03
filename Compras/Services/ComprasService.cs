using Compras.Data;
using Compras.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Compras.Services
{
    public class ComprasService
    {
        private readonly AppDbContext _context;
        public ComprasService(
            [FromServices] AppDbContext context
        )
        {
            _context = context;
        }

        public async Task<List<Compra>> GetAllAsync() {
            var compras = await _context.Compras
                .AsNoTracking()
                .Select(compra => new Compra {
                    Id = compra.Id,
                    Status = compra.Status,
                    Tipo_pagamento = compra.Tipo_pagamento,
                    Total = compra.Total,
                    Produtos = (List<Produto>)compra.Produtos.Select(produto => new Produto
                    {
                        Id = produto.Id,
                        Nome = produto.Nome,
                        Preco = produto.Preco,
                        Descricao = produto.Descricao,
                        Data_criacao = produto.Data_criacao,
                        Data_atualizacao = produto.Data_atualizacao
                    })
                })
                .ToListAsync();

            return compras;

        }

        public async Task<Compra?> GetByIdAsync(int id)
        {
            var compras = await _context.Compras
                .Include(compra => compra.Produtos)
                .FirstOrDefaultAsync(compra => compra.Id == id);

            return compras;
        }

        public async Task CreateAsync(Compra compra)
        {
            try
            {
                var compraRegistrada = await _context.Compras.AddAsync(compra);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.ToString());
            }

        }

        public async Task UpdateAsync(Compra compra)
        {
            try
            {
                _context.Compras.Update(compra);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) { 
                throw new Exception(ex.ToString());
            }
        }

        public async Task DeleteAsync(Compra compra)
        {
            _context.Compras.Remove(compra);
            await _context.SaveChangesAsync();
        }
    }
}

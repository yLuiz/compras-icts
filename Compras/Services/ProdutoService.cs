using Compras.Data;
using Compras.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Compras.Services
{
    public class ProdutoService
    {
        private readonly AppDbContext _context;
        public ProdutoService(
            [FromServices] AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Produto>> GetAllAsync()
        {
            var produtos = await _context.Produtos
                    .AsNoTracking()
                    .ToListAsync();

            return produtos;
        }

        public async Task<Produto?> GetByIdAsync(int id)
        {
            var produto = await _context.Produtos.FirstOrDefaultAsync(produto => produto.Id == id);

            return produto;
        }

        public async Task CreateAsync(Produto produto)
        {
            try
            {
                await _context.Produtos.AddAsync(produto);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new Exception(ex.ToString());
            }
        }

        public async Task UpdateAsync(Produto produto)
        {
            try
            {
                produto.Data_atualizacao = DateTime.Now;
                _context.Produtos.Update(produto);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw new Exception(ex.ToString());
            }
        }

        public async Task DeleteByIdAsync(Produto produto)
        {
            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Produto>> GetManyByIds(List<int> produtosIds) {
            var produtos = await _context.Produtos.Where(produto => produtosIds.Contains(produto.Id))
                .ToListAsync();

            return produtos;
        }
    }
}

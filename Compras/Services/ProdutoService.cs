using Compras.Data;
using Microsoft.AspNetCore.Mvc;

namespace Compras.Services
{
    public class ProdutoService
    {
        private readonly AppDbContext _context;
        public ProdutoService(
            [FromServices] AppDbContext context
        )
        {
            _context = context;
        }

        public async Task<Dictionary<string, object>> Create()
        {
            return new Dictionary<string, object>();
        }
    }
}

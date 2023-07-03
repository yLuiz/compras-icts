using Compras.Data;
using Microsoft.AspNetCore.Mvc;

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
    }
}

using System.Diagnostics.CodeAnalysis;

namespace Compras.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double Preco { get; set; }
        public DateTime Data_criacao { get; set; } = DateTime.Now;
        public DateTime? Data_atualizacao { get; set; } = null;
        public ICollection<Compra> Compras { get; set; }
    }
}
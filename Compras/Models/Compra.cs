using System.Diagnostics.CodeAnalysis;

namespace Compras.Models
{
    public static class StatusOptions
    {
        public static readonly string PENDENTE = "pendente";
        public static readonly string APROVADA = "aprovada";
        public static readonly string REPROVADA = "reprovada";
    }

    public static class TipoPagamentoOptions
    {
        public static readonly string DEBITO = "debito";
        public static readonly string CREDITO = "credito";
        public static readonly string BOLETO = "boleto";
    }
    public class Compra
    {
        public int Id { get; set; }
        public double Total { get; set; }
        public string Tipo_pagamento { get; set; } = TipoPagamentoOptions.BOLETO;
        [AllowNull]
        public string Status { get; set; } = StatusOptions.PENDENTE;
        public DateTime Data_criacao { get; set; } = DateTime.Now;
        public ICollection<Produto> Produtos { get; set; } = new List<Produto>();
    }
}
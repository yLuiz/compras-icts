namespace Compras.Models
{
    public class CompraProduto
    {
        public int CompraId { get; set; }
        public Compra Compra { get; set; }

        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
    }
}
/*
 
[Compra]
- id: long  
- total: double
- data_criacao: Date
- tipo_pagamento: String
- status: String

[Produto]
- id: long
- nome: String
- descricao: String
- preco: double
- data_criacao: Date
- data_atualizacao: Date
 
 */
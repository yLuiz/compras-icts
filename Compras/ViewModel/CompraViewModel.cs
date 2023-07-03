using Compras.Models;
using System.Collections;

namespace Compras.ViewModel
{
    public class CompraViewModel
    {
        public string Tipo_pagamento { get; set; }
        public string Status { get; set; }
        public List<int>? Produtos { get; set; }
    }
}

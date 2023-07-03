using Compras.Models;
using Microsoft.EntityFrameworkCore;

namespace Compras.Data
{
    public class AppDbContext : DbContext
    {

        public DbSet<Compra> Compras { get; set; }
        
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Compra>(entity =>
            {
                entity.HasKey(compra => compra.Id);
                entity.Property(compra => compra.Total)
                    .IsRequired();
                entity.Property(compra => compra.Tipo_pagamento)
                    .IsRequired();
                entity.Property(compra => compra.Status);
                entity.Property(model => model.Data_criacao);
                entity.HasMany(model => model.Produtos);
            });

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.HasKey(produto => produto.Id);

                entity.Property(produto => produto.Nome)
                    .IsRequired();

                entity.Property(produto => produto.Preco)
                    .IsRequired();

                entity.Property(produto => produto.Data_criacao);
                entity.Property(produto => produto.Data_atualizacao);
                entity.HasMany(model => model.Compras);
            });

            /*
            modelBuilder.Entity<CompraProduto>(entity =>
            {
                entity.HasKey(compraProduto => new { compraProduto.CompraId, compraProduto.ProdutoId });


                entity.HasOne(compraProduto => compraProduto.Compra)
                    .WithMany(compra => compra.CompraProdutos)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(compraProduto => compraProduto.Produto)
                    .WithMany(produto => produto.CompraProdutos)
                    .OnDelete(DeleteBehavior.NoAction);                 

            });
            */
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite("DataSource=app.db;Cache=Shared");
    }
}

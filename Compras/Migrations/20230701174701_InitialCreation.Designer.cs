﻿// <auto-generated />
using System;
using Compras.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Compras.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230701174701_InitialCreation")]
    partial class InitialCreation
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.8");

            modelBuilder.Entity("Compras.Models.Compra", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Data_criacao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Tipo_pagamento")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Total")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Compras");
                });

            modelBuilder.Entity("Compras.Models.CompraProduto", b =>
                {
                    b.Property<int>("CompraId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProdutoId")
                        .HasColumnType("INTEGER");

                    b.HasKey("CompraId", "ProdutoId");

                    b.HasIndex("ProdutoId");

                    b.ToTable("CompraProdutos");
                });

            modelBuilder.Entity("Compras.Models.Produto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Data_atualizacao")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Data_criacao")
                        .HasColumnType("TEXT");

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("Preco")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("Produtos");
                });

            modelBuilder.Entity("Compras.Models.CompraProduto", b =>
                {
                    b.HasOne("Compras.Models.Compra", "Compra")
                        .WithMany("CompraProdutos")
                        .HasForeignKey("CompraId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Compras.Models.Produto", "Produto")
                        .WithMany("CompraProdutos")
                        .HasForeignKey("ProdutoId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Compra");

                    b.Navigation("Produto");
                });

            modelBuilder.Entity("Compras.Models.Compra", b =>
                {
                    b.Navigation("CompraProdutos");
                });

            modelBuilder.Entity("Compras.Models.Produto", b =>
                {
                    b.Navigation("CompraProdutos");
                });
#pragma warning restore 612, 618
        }
    }
}
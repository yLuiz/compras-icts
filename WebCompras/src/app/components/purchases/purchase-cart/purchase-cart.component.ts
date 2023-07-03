import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/IProduct';
import { PurchaseCartService } from 'src/app/services/purchase-cart.service';
import { PurchaseService } from 'src/app/services/purchase.service';

enum EStatusPayment {
  PENDENTE = "pendente",
  APROVADO = "aprovado",
  REPROVADO = "reprovado",

}

@Component({
  selector: 'app-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: ['./purchase-cart.component.scss']
})
export class PurchaseCartComponent implements OnInit {

  paymentsOptions = [
    {name: 'Boleto', code: 'boleto'},
    {name: 'Crédito', code: 'credito'},
    {name: 'Débito', code: 'debito'},
  ];

  paymentSelected = this.paymentsOptions[0];

  productsInCart: IProduct[] = [];
  totalPrice = 0;
  isLoading = false;

  constructor(
    private _purchasecartService: PurchaseCartService,
    private _purchaseService: PurchaseService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  createPurchaseObject(
    totalPrice: number, 
    payment: (typeof this.paymentsOptions[0]), 
    products: IProduct[]
  ) {

    const productsId: number[] = [];

    products.forEach(product => productsId.push(product.id!));

    return {
      total: totalPrice,
      tipo_pagamento: payment.code,
      status: EStatusPayment.PENDENTE,
      produtos: productsId
    }
  }

  updateCart() {
    this.productsInCart = this._purchasecartService.getProducts();
    this.totalPrice = this._purchasecartService.getTotalPrice();
  }

  removeItem(productId: number) {
    this._purchasecartService.removeProductById(productId);
    this._purchasecartService.saveChangesLocally();
    this.updateCart();
  }

  finishPurchase() {

    const purchase = this.createPurchaseObject(this.totalPrice, this.paymentSelected, this.productsInCart);

    this.isLoading = true;

    setTimeout(() => {
      this._purchaseService.createPurchase(purchase).subscribe({
        next: response => {
          this._messageService.add({
            summary: "Sucesso",
            detail: "Compra efetuada com sucesso",
            severity: "success"
          })
  
          this._purchasecartService.clean();
          this._purchasecartService.saveChangesLocally();
          this.updateCart();
          this.isLoading = false;
          this._router.navigate(["/compras"]);
        },
        error: response => {
          console.error(response);
          this._messageService.add({
            summary: "Error",
            detail: "Não foi possivel efetuar a compra.",
            severity: "error"
          })
          this.isLoading = false;
        }
      });
    }, 250)
  }

  ngOnInit(): void {
    this.updateCart();
  }

}
;
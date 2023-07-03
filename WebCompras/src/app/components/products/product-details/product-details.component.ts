import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { PurchaseCartService } from 'src/app/services/purchase-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productAlreadyInCart = false;
  productId!: number;
  product!: IProduct;
  isLoading = true;

  constructor(
    private _productService: ProductService,
    private _messageService: MessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _purchasecartService: PurchaseCartService
  ) { }

  goToEditProduct(productId: number) {
    this._router.navigate([`produtos/editar/${productId}`]);
  }

  deleteProduct(productId: number) {

    this.isLoading = true;

    this._productService.deleteProduct(productId).subscribe({
      next: () => {
        this._messageService.add({
          summary: "Sucesso",
          detail: "Produto removido com sucesso",
          severity: "success"
        })
        this.isLoading = false;
        this._router.navigate(["/produtos"]);
      },
      error: response => {
        console.error(response);
        this._messageService.add({
          summary: "Error",
          detail: "Falha ao executar a ação",
          severity: "error"
        })
        this.isLoading = false;
      }
    })
  }

  addToCart(product: IProduct) {
    this._purchasecartService.addProduct(product);
    this._purchasecartService.saveChangesLocally();
    this.setIfProductInCart(this.productId);
  }

  removeOfCart(product: IProduct) {
    this._purchasecartService.removeProductById(product.id!);
    this._purchasecartService.saveChangesLocally();
    this.productAlreadyInCart = false;
  }

  setIfProductInCart(id: number) {
    const productsInCart = this._purchasecartService.getProducts();
    productsInCart.forEach(product => {
      if (product.id === id) this.productAlreadyInCart = true;
    })
  }

  ngOnInit(): void {

    this.productId = Number(this._route.snapshot.paramMap.get("id"));

    this._productService.getProductById(this.productId).subscribe({
      next: produtoResponse => {
        this.product = produtoResponse;
        setTimeout(() => {
          this.isLoading = false;
          this.setIfProductInCart(this.productId);
        }, 500);
      },
      error: response => {
        console.error(response);
        this._messageService.add({
          summary: "Error",
          detail: "Falha ao tentar obter os dados",
          severity: "error"

        })
      }
    })
  }

}

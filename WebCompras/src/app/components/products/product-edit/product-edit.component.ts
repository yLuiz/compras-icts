import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productId!: number;
  product!: IProduct;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _messsageService: MessageService
  ) { }

  editProduct(product: IProduct) {
    this._productService.updateProduct(this.productId, product).subscribe({
      next: response => {
        this._messsageService.add({
          summary: "Sucesso",
          detail: "Produto atualizado com sucesso.",
          severity: "success"
        })

        this._router.navigate(["/produtos"]);

      },
      error: response => {
        console.error(response);
        this._messsageService.add({
          summary: "Error",
          detail: "Falha ao efetuar a ação.",
          severity: "error"
        })
      },
    })
  }

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get('id'));

    this._productService.getProductById(this.productId).subscribe({
      next: response => {
        this.product = response;
      },
      error: response => {
        this._messsageService.add({
          summary: "Error",
          detail: "Falha ao receber os dados.",
          severity: "error"
        })
        console.error(response);
      }
    });

  }

}

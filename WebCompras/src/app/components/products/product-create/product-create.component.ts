import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _messageService: MessageService
  ) { }

  createProduct(product: IProduct) {
    this._productService.isLoadingRequest.next(true);

    this._productService.createProduct(product).subscribe({
      next: response => {
        this._messageService.add({
          summary: "Sucesso",
          detail: "Produto criado com sucesso",
          severity: "success",
        });
        this._productService.isLoadingRequest.next(false);
        this._router.navigate(['produtos']);
      },
      error: response => {
        console.error(response);
        this._productService.isLoadingRequest.next(false);
      }
    });
  }

  ngOnInit(): void {}

}

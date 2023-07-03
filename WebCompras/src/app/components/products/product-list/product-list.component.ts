import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  isLoading = true;
  products: IProduct[] = [];

  constructor(
    private _productService: ProductService
  ) {}

  ngOnInit(): void {

    this._productService.getAllProducts().subscribe({
      next: (productResponse: IProduct[]) => {
        this.products = productResponse;
        setTimeout(() => {
          this.isLoading = false;
        }, 250);
      },
      error: (response) => {
        console.error(response);
      }
    })
  }

}

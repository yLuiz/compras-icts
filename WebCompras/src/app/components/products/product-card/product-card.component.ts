import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: IProduct;

  goToDetails(productId: number) {
    this._router.navigate([`/produtos/detalhes/${productId}`])
  }

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

}

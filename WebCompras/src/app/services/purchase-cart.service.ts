import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class PurchaseCartService {

  private _products: IProduct[] = [];

  constructor() { 
    const productsInLocalStorage = localStorage.getItem("purchasecart");
    if (productsInLocalStorage) {
      this._products = JSON.parse(productsInLocalStorage);
    }
  }

  saveChangesLocally() {
    localStorage.removeItem("purchasecart");
    localStorage.setItem("purchasecart", JSON.stringify(this._products));
  }

  getProducts() {
    return this._products;
  }

  addProduct(product: IProduct) {
    this._products.push(product);
  }

  removeProductById(productId: number) {
    this._products = this._products.filter(product => product.id !== productId);
  }

  getTotalPrice() {

    let total = 0;
    this._products.forEach(product => total += product.preco)

    return total;
  }

  clean() {
    this._products = [];
  }
}

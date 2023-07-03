import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public isLoadingRequest = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient
  ) { }

  public createProduct(product: IProduct) {
    return this._http.post(`${environment.api_url}/Produtos`, product);
  }

  public getAllProducts() {
    return this._http.get<IProduct[]>(`${environment.api_url}/Produtos`);
  }

  public getProductById(id: number) {
    return this._http.get<IProduct>(`${environment.api_url}/Produtos/${id}`);
  }

  public updateProduct(id: number, product: IProduct) {
    return this._http.put(`${environment.api_url}/Produtos/${id}`, product);
  }

  public deleteProduct(id: number) {
    return this._http.delete(`${environment.api_url}/Produtos/${id}`);
  }

}

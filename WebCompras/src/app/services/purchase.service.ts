import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPurchase, IPurchaseCreate } from '../interfaces/IPurchase';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  isLoadingRequest = new BehaviorSubject(false);

  constructor(
    private _http: HttpClient
  ) { }

  public createPurchase(purchase: IPurchaseCreate) {
    return this._http.post(`${environment.api_url}/Compras`, purchase);
  }

  public getAllPurchases() {
    return this._http.get<IPurchase[]>(`${environment.api_url}/Compras`);
  }

  public getPurchaseById(id: number) {
    return this._http.get<IPurchase>(`${environment.api_url}/Compras/${id}`);
  }

  public updatePurchase(id: number, purchase: IPurchase) {
    return this._http.put(`${environment.api_url}/Compras/${id}`, purchase);
  }

  public deletePurchase(id: number) {
    return this._http.delete(`${environment.api_url}/Compras/${id}`);
  }
}

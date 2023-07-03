import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPurchase } from 'src/app/interfaces/IPurchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

  purchases: IPurchase[] = [];
  isLoading = true;

  constructor(
    private _purchaseService: PurchaseService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  updatePurchaseList() {

    this.isLoading = true;

    this._purchaseService.getAllPurchases().subscribe({
      next: purchasesResponse => {
        this.purchases = purchasesResponse;

        setTimeout(() => {
          this.isLoading = false;
        }, 250);

      },
      error: response => {
        console.error(response);
        this.isLoading = false;
      }
    })
  }

  goToEditPurchase(purchaseId: number) {
    this._router.navigate([`/compras/editar/${purchaseId}`]);
  }

  deletePurchase(purchaseId: number) {
    this._purchaseService.deletePurchase(purchaseId).subscribe({
      next: () => {
        this._messageService.add({
          summary: "Sucesso",
          detail: "Compra deletada com sucesso",
          severity: "success"
        })

        this.updatePurchaseList();
      },
      error: response => {
        console.error(response);
        this._messageService.add({
          summary: "Error",
          detail: "Não foi possível efetuar a ação",
          severity: "error"
        })
      }
    })
  }

  ngOnInit(): void {
    this.updatePurchaseList()
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IPurchase } from 'src/app/interfaces/IPurchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {

  purchaseId!: number;
  purchase!: IPurchase;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _purchaseService: PurchaseService,
    private _messageService: MessageService
  ) { }

  editPurchase(purchase: IPurchase) {
    this._purchaseService.updatePurchase(this.purchaseId, purchase).subscribe({
      next: response => {
        this._messageService.add({
          summary: "Sucesso",
          detail: "Compra atualizada com sucesso.",
          severity: "success"
        })

        this._router.navigate(['compras']);

      },
      error: response => {
        console.error(response);
        this._messageService.add({
          summary: "Error",
          detail: "Falha ao executar a ação.",
          severity: "error"
        })
      }
    });
  }

  ngOnInit(): void {

    
    this.purchaseId = Number(this._route.snapshot.paramMap.get("id"));
    this._purchaseService.getPurchaseById(this.purchaseId).subscribe({
      next: response => {
        this.purchase = response;
      },
      error: response => {
        console.error(response);
        this._messageService.add({
          summary: "Error",
          detail: "Houve um erro ao obter os dados.",
          severity: "error"
        })        
      }
    })
  }

}

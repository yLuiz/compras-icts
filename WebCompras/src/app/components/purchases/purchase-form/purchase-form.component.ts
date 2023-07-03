import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IPurchase } from 'src/app/interfaces/IPurchase';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements OnInit {

  @Input() buttonText = "Cadastrar";
  @Input() purchase: IPurchase | null = null;

  @Output() submitEvent: EventEmitter<IPurchase> = new EventEmitter<IPurchase>();

  isLoading = false;
  preco: number = 0;

  paymentsOptions = [
    {name: 'Boleto', code: 'boleto'},
    {name: 'Crédito', code: 'credito'},
    {name: 'Débito', code: 'debito'},
  ];

  paymentSelected = this.paymentsOptions[0]; 

  statusOptions = [
    {name: 'Pendente', code: 'pendente'},
    {name: 'Aprovado', code: 'aprovado'},
    {name: 'Reprovado', code: 'reprovado'},
  ];

  statusSelected = this.statusOptions[0];

  handleSubmit() {

    const purchase: IPurchase = {
      status: this.statusSelected.code,
      tipo_pagamento: this.paymentSelected.code,
      total: this.purchase!.total,
      produtos: null
    };

    this.submitEvent.emit(purchase);
  }

  constructor(
    private _purchaseService: PurchaseService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.paymentSelected = this.paymentsOptions.filter(payment => payment.code === this.purchase?.tipo_pagamento)[0];
    this.statusSelected = this.statusOptions.filter(status => status.code === this.purchase?.status)[0];

    this._purchaseService.isLoadingRequest.subscribe(value => {
      this.isLoading = value;
    })

  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/interfaces/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() buttonText = "Cadastrar";
  @Input() product: IProduct | null = null;

  @Output() submitEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  isLoading = false;
  productForm!: FormGroup;
  preco: number = 0;

  handleSubmit() {

    let invalidFields = this.productForm.invalid || this.preco <=0;

    if (invalidFields) {
      this._messageService.add({
        summary: "Campos inválidos",
        detail: "Preencha os campos corretamente",
        severity: "error",
      });

      return;
    }

    const product = {
      nome: this.nome?.value,
      descricao: this.descricao?.value,
      preco: this.preco
    };

    this.submitEvent.emit(product);
  }

  constructor(
    private _productService: ProductService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      nome: new FormControl(this.product ? this.product.nome : "", [Validators.required, Validators.minLength(1)]),
      descricao: new FormControl(this.product ? this.product.descricao : "", [Validators.required, Validators.minLength(6)]),
    });

    this._productService.isLoadingRequest.subscribe(value => {
      this.isLoading = value;
    })

    this.preco = this.product ? this.product.preco : 0;

  }

  get nome() {
    return this.productForm.get("nome");
  }

  get descricao() {
    return this.productForm.get("descricao");
  }

}

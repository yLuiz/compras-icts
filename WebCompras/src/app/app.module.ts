import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';

import { ProductComponent } from './pages/product/product.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';

import { PurchaseCartComponent } from './components/purchases/purchase-cart/purchase-cart.component';
import { PurchaseListComponent } from './components/purchases/purchase-list/purchase-list.component';
import { PurchaseEditComponent } from './components/purchases/purchase-edit/purchase-edit.component';
import { PurchaseFormComponent } from './components/purchases/purchase-form/purchase-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    NavbarComponent,
    ProductCardComponent,
    PurchaseComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductListComponent,
    PurchaseListComponent,
    ProductDetailsComponent,
    PurchaseCartComponent,
    PurchaseEditComponent,
    ProductEditComponent,
    PurchaseFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    DropdownModule,
    AccordionModule,
    DividerModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

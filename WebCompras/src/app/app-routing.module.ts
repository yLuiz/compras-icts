import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';

import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PurchaseListComponent } from './components/purchases/purchase-list/purchase-list.component';
import { PurchaseCartComponent } from './components/purchases/purchase-cart/purchase-cart.component';
import { PurchaseEditComponent } from './components/purchases/purchase-edit/purchase-edit.component';

const routes: Routes = [
  { 
    path: 'produtos', component: ProductComponent, children: [
      { path: "", component: ProductListComponent },
      { path: "detalhes/:id", component: ProductDetailsComponent },
      { path: "criar", component: ProductCreateComponent },
      { path: "editar/:id", component: ProductEditComponent }
    ] 
  },
  { path: 'compras', component: PurchaseComponent, children: [
      { path: "", component: PurchaseListComponent },
      { path: "carrinho", component: PurchaseCartComponent },
      { path: "editar/:id", component: PurchaseEditComponent }
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

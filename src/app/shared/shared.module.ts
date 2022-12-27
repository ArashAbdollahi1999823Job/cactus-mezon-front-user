import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./components/nav/nav.component";
import {RouterModule} from "@angular/router";
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    NavComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavComponent,ProductDetailsComponent]
})
export class SharedModule { }

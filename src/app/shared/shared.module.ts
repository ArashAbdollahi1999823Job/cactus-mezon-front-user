import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./components/nav/nav.component";
import {RouterModule} from "@angular/router";
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    NavComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
      NgxSpinnerModule.forRoot({type: 'line-scale-pulse-out'})
  ],
  exports:[NavComponent,ProductDetailsComponent,NgxSpinnerModule]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket-c/basket.component';
import { OrderTotalComponent } from './order-total/order-total.component';


@NgModule({
  declarations: [
    BasketComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule
  ]
})
export class BasketModule { }

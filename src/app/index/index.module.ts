import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import {IndexComponent} from "./index-c/index.component";
import {TypeProductSliderComponent} from "./type-product-slider/type-product-slider-c/type-product-slider.component";
import { ProductItemComponent } from './type-product-slider/product-item/product-item.component';


@NgModule({
  declarations: [
      IndexComponent,
    TypeProductSliderComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }

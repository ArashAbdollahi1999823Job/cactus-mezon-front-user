import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product-c/product.component';
import { SliderThreeComponent } from './product/slider-three/slider-three.component';


@NgModule({
  declarations: [
    ProductComponent,
    SliderThreeComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product-c/product.component';
import { SliderThreeComponent } from './product/slider-three/slider-three.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';


@NgModule({
  declarations: [
    ProductComponent,
    SliderThreeComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }

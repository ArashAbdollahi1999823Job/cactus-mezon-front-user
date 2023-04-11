import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type-c/type.component';
import { TypeSliderComponent } from './type-slider/type-slider.component';


@NgModule({
  declarations: [
    TypeComponent,
    TypeSliderComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule
  ]
})
export class TypeModule { }

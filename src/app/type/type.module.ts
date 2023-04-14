import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type-c/type.component';
import { SliderTwoComponent } from './slider-two/slider-two-c/slider-two.component';
import {IndexModule} from "../index/index.module";
@NgModule({
  declarations: [
    TypeComponent,
    SliderTwoComponent,
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    IndexModule
  ]
})
export class TypeModule { }

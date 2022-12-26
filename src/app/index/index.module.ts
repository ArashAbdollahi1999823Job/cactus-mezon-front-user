import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import {IndexComponent} from "./index-c/index.component";
import {SliderCardManComponent} from "./slider-card-man/slider-card-man.component";
import {SliderCardWomanComponent} from "./slider-card-woman/slider-card-woman.component";


@NgModule({
  declarations: [
      IndexComponent,
    SliderCardManComponent,
    SliderCardWomanComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }

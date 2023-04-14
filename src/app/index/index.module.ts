import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import {IndexComponent} from "./index-c/index.component";
import {SliderOneComponent} from "./slider-one/slider-one-c/slider-one.component";
import { SlideOneComponent } from './slider-one/slide-one/slide-one.component';


@NgModule({
    declarations: [
        IndexComponent,
        SliderOneComponent,
        SlideOneComponent,
    ],
    exports: [
        SliderOneComponent
    ],
    imports: [
        CommonModule,
        IndexRoutingModule
    ]
})
export class IndexModule { }

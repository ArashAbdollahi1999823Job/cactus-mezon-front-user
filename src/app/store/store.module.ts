import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store/store-c/store.component';
import { StoreIndexComponent } from './store/store-index/store-index-c/store-index.component';
import { StoreDetailComponent } from './store/store-detail/store-detail-c/store-detail.component';
import {StoreFilterComponent} from "./store/store-index/store-filter/store-filter.component";
import {StoreResultComponent} from "./store/store-index/store-result/store-result.component";
import {StoreCard} from "./store/store-index/store-result/store-card/store-card";
import { StoreSliderComponent } from './store/store-detail/store-slider/store-slider.component';
import { StoreInformationComponent } from './store/store-detail/store-information/store-information.component';


@NgModule({
  declarations: [
    StoreFilterComponent,
    StoreResultComponent,
    StoreCard,
    StoreComponent,
    StoreIndexComponent,
    StoreDetailComponent,
    StoreSliderComponent,
    StoreInformationComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }

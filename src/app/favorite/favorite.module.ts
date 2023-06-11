import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite-c/favorite.component';
import {
  CardFavoriteProductResultComponent
} from "./favorite-c/card-favorite-productResult/card-favorite-product-result.component";


@NgModule({
  declarations: [
    FavoriteComponent,
    CardFavoriteProductResultComponent
  ],
  imports: [
    CommonModule,
    FavoriteRoutingModule
  ]
})
export class FavoriteModule { }

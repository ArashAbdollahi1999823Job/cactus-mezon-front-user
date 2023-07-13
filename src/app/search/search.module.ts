import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import {SearchComponent} from "./search-c/search.component";
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {
  CardSearchProductResultComponent
} from "./search-result/card-search-productResult/card-search-product-result.component"
@NgModule({
  declarations: [
    CardSearchProductResultComponent,
    SearchComponent,
    SearchFilterComponent,
    SearchResultComponent,
  ],
    imports: [
        CommonModule,
        SearchRoutingModule,
    ]
})
export class SearchModule { }

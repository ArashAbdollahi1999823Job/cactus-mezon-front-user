import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import {SearchComponent} from "./search-c/search.component";
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchPaginationComponent } from './search-pagination/search-pagination.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFilterComponent,
    SearchResultComponent,
    SearchPaginationComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
  ]
})
export class SearchModule { }

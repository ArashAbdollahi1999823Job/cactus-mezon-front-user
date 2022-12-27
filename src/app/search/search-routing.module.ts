import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search-c/search.component";
import {ProductDetailsComponent} from "../shared/components/product-details/product-details.component";

const routes: Routes = [
  {path:'',component:SearchComponent},
  {path:':type/:product/:slug',component:ProductDetailsComponent},
  {path:'**',component:SearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

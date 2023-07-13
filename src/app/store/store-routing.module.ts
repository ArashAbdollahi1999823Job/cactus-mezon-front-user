import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreIndexComponent} from "./store/store-index/store-index-c/store-index.component";
import {StoreDetailComponent} from "./store/store-detail/store-detail-c/store-detail.component";

const routes: Routes = [
  {path:'',component:StoreIndexComponent},
  {path:':StoreSlug',component:StoreDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }

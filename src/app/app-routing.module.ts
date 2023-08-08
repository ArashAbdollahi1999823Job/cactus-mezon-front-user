import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizeGuard} from "./shared/Guards/authorize.guard";
const routes: Routes = [
  {path:'',loadChildren:()=>import('./index/index.module').then(x=>x.IndexModule),data:{Title:"فروشگاه بزرگ کاکتوس"}},
  {path:'store',loadChildren:()=>import('./store/store.module').then(x=>x.StoreModule),data:{Title:"فروشگاه های عضو کاکتوس"}},
  {path:'chat',canActivate:[AuthorizeGuard],loadChildren:()=>import('./chat/chat.module').then(x=>x.ChatModule),data:{Title: "پشتیبانی فروشگاه بزرگ کاکتوس"}},
  {path:'favorite',canActivate:[AuthorizeGuard],loadChildren:()=>import('./favorite/favorite.module').then(x=>x.FavoriteModule)},
  {path:'search',loadChildren:()=>import('./search/search.module').then(x=>x.SearchModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)},
  {path:':TypeSlug',loadChildren:()=>import('./type/type.module').then(x=>x.TypeModule)},
  {path:':TypeSlug/:ProductSlug',loadChildren:()=>import('./product/product.module').then(x=>x.ProductModule)},
  {path:'**',loadChildren:()=>import('./search/search.module').then(x=>x.SearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

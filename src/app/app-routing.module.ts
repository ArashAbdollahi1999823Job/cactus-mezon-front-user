import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./index/index.module').then(x=>x.IndexModule)},
  {path:'cactus',loadChildren:()=>import('./index/index.module').then(x=>x.IndexModule)},
  {path:'index',loadChildren:()=>import('./index/index.module').then(x=>x.IndexModule)},

  {path:'chat',loadChildren:()=>import('./chat/chat.module').then(x=>x.ChatModule)},
  {path:'favorite',loadChildren:()=>import('./favorite/favorite.module').then(x=>x.FavoriteModule)},
  {path:'search',loadChildren:()=>import('./search/search.module').then(x=>x.SearchModule)},
  {path:'basket',loadChildren:()=>import('./basket/basket.module').then(x=>x.BasketModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(x=>x.AuthModule)},
  {path:'**',loadChildren:()=>import('./search/search.module').then(x=>x.SearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

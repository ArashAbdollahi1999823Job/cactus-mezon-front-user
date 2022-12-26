import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import { AppComponent } from './app-c/app.component';
import {FavoriteModule} from "./favorite/favorite.module";
import {IndexModule} from "./index/index.module";
import {SearchModule} from "./search/search.module";
import {BasketModule} from "./basket/basket.module";
import {AuthModule} from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FavoriteModule,
    IndexModule,
    SearchModule,
    BasketModule,
    AuthModule,
    ChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

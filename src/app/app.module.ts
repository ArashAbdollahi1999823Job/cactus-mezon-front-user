import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import { AppComponent } from './app-c/app.component';
import {FavoriteModule} from "./favorite/favorite.module";
import {IndexModule} from "./index/index.module";
import {SearchModule} from "./search/search.module";
import {BasketModule} from "./basket/basket.module";
import {AuthModule} from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorHandlingInterceptor} from "./shared/interceptors/error-handling.interceptor";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {TypeModule} from "./type/type.module";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    IndexModule,
    TypeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FavoriteModule,
    SearchModule,
    BasketModule,
    AuthModule,
    ChatModule,
    ToastrModule.forRoot({positionClass:'toast-top-full-width',progressAnimation:'decreasing',timeOut:5000,progressBar:true,preventDuplicates:true,closeButton:false}),
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

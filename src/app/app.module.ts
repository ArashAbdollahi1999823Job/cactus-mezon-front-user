import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";
import { AppComponent } from './app-c/app.component';
import {FavoriteModule} from "./favorite/favorite.module";
import {IndexModule} from "./index/index.module";
import {SearchModule} from "./search/search.module";
import {AuthModule} from "./auth/auth.module";
import {ChatModule} from "./chat/chat.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorHandlingInterceptor} from "./shared/interceptors/error-handling.interceptor";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {TypeModule} from "./type/type.module";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';

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
    AuthModule,
    ChatModule,
    ToastrModule.forRoot({positionClass:'toast-top-full-width',progressAnimation:'decreasing',timeOut:5000,progressBar:true,preventDuplicates:true,closeButton:false}),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,  useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "./components/nav/nav.component";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
      NgxSpinnerModule.forRoot({type: 'line-scale-pulse-out'})
  ],
  exports:[NavComponent,NgxSpinnerModule]
})
export class SharedModule { }

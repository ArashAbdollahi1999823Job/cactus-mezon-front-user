import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat-c/chat.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ChatNavComponent} from "./chat-nav/chat-nav.component";


@NgModule({
  declarations: [
    ChatComponent,
    ChatNavComponent,
    ChatBodyComponent
  ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        ReactiveFormsModule
    ]
})
export class ChatModule { }

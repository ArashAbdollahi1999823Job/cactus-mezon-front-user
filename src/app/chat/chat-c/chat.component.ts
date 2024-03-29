import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {AuthService} from "../../auth/Services/auth.service";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {Meta} from "@angular/platform-browser";
@Component({
  selector: 'chat-c',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit,OnDestroy,AfterViewInit{
  private userAuthorizeDto:UserAuthorizeDto;
  constructor(private chatService:ChatService,private authService:AuthService,private renderer: Renderer2,private ef:ElementRef,private meta:Meta) {}
  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: "noindex,nofollow" });
    this.authService.currentUser$.subscribe((res:UserAuthorizeDto)=>{if(res){this.userAuthorizeDto= res}});
    this.chatService.CreateChatHubConnection(this.userAuthorizeDto.token);
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.chat'), 'height', window.innerHeight-70+ "px");
  }
  ngOnDestroy(): void {
    this.chatService.chatHubStop();
  }
}

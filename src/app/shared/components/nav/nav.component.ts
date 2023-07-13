import {Component, ElementRef, OnInit} from '@angular/core';
import {PresenceService} from "../../Services/presence.service";
import {ChatService} from "../../../chat/chat-service/chat.service";
import {AuthService} from "../../../auth/Services/auth.service";
import {MessageSearchDto} from "../../dto/Chat/message/messageSearchDto";
import {IsReadType} from "../../enum/isReadType";
import {PaginationDto} from "../../dto/base/paginationDto";
import {MessageDto} from "../../dto/Chat/message/messageDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  public fadeMoreNav:boolean=false;
  public moreNavEl: Element;
  public flashEl: Element;

  constructor(public authService: AuthService, public chatService:ChatService, public presenceService:PresenceService,private ef:ElementRef) {}
  ngOnInit(): void {
    this.messageUnReadGetAll();
  }
  public messageUnReadGetAll(){
    let messageSearchDto=new MessageSearchDto();
    messageSearchDto.isRead=IsReadType.UnRead;
    messageSearchDto.responderPhoneNumber=this.authService.getPhoneNumber();
    this.chatService.messageSearchDtoSet(messageSearchDto);
    this.chatService.messageGetAll().subscribe((paginationMessageUnReadDtos:PaginationDto<MessageDto>)=>{
      if(paginationMessageUnReadDtos){
        this.presenceService.messageUnReadDtos.next(paginationMessageUnReadDtos.data);
      }
    })
  }
  logout() {
    if(confirm(environment.messages.common.doYouWantToExit)){
    this.authService.logout();
    }
  }

  handleMoreNav() {
    this.fadeMoreNav = !this.fadeMoreNav;

    this.moreNavEl = this.ef.nativeElement.getElementsByClassName('more-nav')[0];
    this.flashEl = this.ef.nativeElement.getElementsByClassName('flash')[0];

    if (this.fadeMoreNav) {
      this.moreNavEl.classList.add('fadeInMoreNav');
      this.moreNavEl.classList.remove('fadeOutMoreNav');
      this.flashEl.classList.add('animateDown');
      this.flashEl.classList.remove('animateUp');
    } else {
      this.moreNavEl.classList.add('fadeOutMoreNav');
      this.moreNavEl.classList.remove('fadeInMoreNav');
      this.flashEl.classList.remove('animateDown');
      this.flashEl.classList.add('animateUp');
    }
  }
}


import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {BehaviorSubject} from "rxjs";
import {MessageSearchDto} from "../dto/Chat/message/messageSearchDto";
import {IsReadType} from "../enum/isReadType";
import {PaginationDto} from "../dto/base/paginationDto";
import {ChatService} from "../../chat/chat-service/chat.service";
import {MessageDto} from "../dto/Chat/message/messageDto";
@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private hubUrl=environment.hubUrl;
  private hubConnection:HubConnection;
  public messageUnReadDtos = new BehaviorSubject<MessageDto[]>(null);
  public messageUnReadDtos$ = this.messageUnReadDtos.asObservable();
  private usersOnline=new BehaviorSubject<string[]>([]);
  public usersOnline$=this.usersOnline.asObservable();
  constructor(private toastService:ToastrService,private chatService:ChatService) { }
  public createHubConnection(user :UserAuthorizeDto){
    this.hubConnection=new HubConnectionBuilder().withUrl(this.hubUrl+"/presence",{
      accessTokenFactory:()=>user?.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch((err)=>{
      this.toastService.error("err.message()")
    })
    this.hubConnection.on("UsersOnlineGet",(users:string[])=>{
      this.usersOnline.next(users);
    });
    this.hubConnection.on("MessageUnReadUpdate", () => {
      let messageSearchDto=new MessageSearchDto();
      messageSearchDto.isRead=IsReadType.UnRead;
      messageSearchDto.responderPhoneNumber=localStorage.getItem(environment.storage.myPhoneNumber);
      this.chatService.messageSearchDtoSet(messageSearchDto);
      this.chatService.messageGetAllJust().subscribe((paginationMessageUnReadDtoRes:PaginationDto<MessageDto>)=>{
        if(paginationMessageUnReadDtoRes){
          this.messageUnReadDtos.next(paginationMessageUnReadDtoRes.data);
        }
      })
    })
  }
  public stopHubConnection(){
    this.hubConnection.stop().catch((err)=>{
      this.toastService.error('error stop')
    })
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {BehaviorSubject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private hubUrl=environment.hubUrl;
  private hubConnection:HubConnection;
  private usersOnline=new BehaviorSubject<string[]>([]);
  public usersOnline$=this.usersOnline.asObservable();
  constructor(private toastService:ToastrService) { }
  public createHubConnection(user :UserAuthorizeDto){
    this.hubConnection=new HubConnectionBuilder().withUrl(this.hubUrl+"/presence",{
      accessTokenFactory:()=>user?.token
    }).withAutomaticReconnect().build();

    this.hubConnection.start().catch((err)=>{
      this.toastService.error("err.message()")
    })

    this.hubConnection.on("UserIsOnline",(userName:string)=>{
      this.toastService.info(userName+"is online");
    });
    this.hubConnection.on("UserIsOffline",(userName:string)=>{
      this.toastService.error(userName+"is offline")
    });
    this.hubConnection.on("UsersOnlineGet",(users:string[])=>{
      this.usersOnline.next(users);
    });
    this.hubConnection.on("HaveNewMessage", () => {
      this.toastService.info('شما پیام جدید دارید')
    })
  }
  public stopHubConnection(){
    this.hubConnection.stop().catch((err)=>{
      this.toastService.error('error stop')
    })
  }
}

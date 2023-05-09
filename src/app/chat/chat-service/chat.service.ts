import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageAddDto} from "../../shared/dto/Message/messageAddDto";
import {BehaviorSubject, Observable} from "rxjs";
import {MessageDto} from "../../shared/dto/Message/messageDto";
import {environment} from "../../../environments/environment";
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messageDtos = new BehaviorSubject<MessageDto[]>(null);
  public messageDtos$ = this.messageDtos.asObservable();
  private connectionId: string;
  public chatHub: HubConnection;
  public chatHubUrl = environment.chatHubUrl;
  constructor(private http: HttpClient, private toastService: ToastrService) {}

  public CreateChatHubConnection(token: string) {
    this.chatHub = new HubConnectionBuilder().withUrl(this.chatHubUrl, {
      accessTokenFactory: () => token
    }).withAutomaticReconnect().build();

    this.chatHub.start().catch((err) => {
      this.toastService.error(environment.messages.common.failedConnectionChatHub);
    })
    this.connectionId = this.chatHub.connectionId;

    this.chatHub.on("SetGroupName", (groupName) => {
      localStorage.setItem(environment.storage.groupName, groupName)
    })

    this.chatHub.on("ShowNewMessage",(messageDto:MessageDto)=>{
      if (messageDto) {
        this.messageDtos$.subscribe((messageDtos) => {
          messageDtos.push(messageDto);
          this.messageDtos = new BehaviorSubject<MessageDto[]>(messageDtos);
        })
      }
    })

    this.chatHub.on("HaveNewMessage", () => {
      this.toastService.info("شما پیام جدید دارید.")
    })

    this.chatHub.on("TestSuccess", () => {
      console.log("TestSuccess")
    })

    this.chatHub.on("UpdateMessages", (messageDtos: MessageDto[]) => {
      this.messageDtos = new BehaviorSubject<MessageDto[]>(messageDtos);
      this.messageDtos$ = this.messageDtos.asObservable();
    })
  }
  public connectionDeleteInGroup() {
    this.chatHub.invoke("ConnectionDeleteInGroup");
  }
  public createGroup(userResponderPhoneNumber: string) {
    this.chatHub.invoke<MessageDto[]>("CreateGroup", userResponderPhoneNumber).catch((err) => {
      if (this.chatHub.state == HubConnectionState.Connecting) setTimeout(() => {
        this.createGroup(userResponderPhoneNumber)
      }, 500)
    }).then((res: MessageDto[]) => {
      this.messageDtos=new BehaviorSubject<MessageDto[]>(res);
      this.messageDtos$=this.messageDtos.asObservable();
    });
  }
  public messageAdd(messageAddDto: MessageAddDto) {
    this.chatHub.invoke("messageAdd",messageAddDto)
  }
  public chatHubStop() {
    this.chatHub.stop().catch((err) => {
      this.toastService.error('error stop')
    })
  }
}

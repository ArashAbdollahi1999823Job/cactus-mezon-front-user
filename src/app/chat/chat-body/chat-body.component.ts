import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageAddDto} from "../../shared/dto/Message/messageAddDto";

@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit, OnDestroy {
  public responderPhoneNumber: string;
  private subscription:Subscription;
  public messageAddForm: FormGroup = new FormGroup({
    responderPhoneNumber: new FormControl(null,[]),
    content: new FormControl(null,[]),
    pictureUrl: new FormControl(null,[])
  })
  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.handleChangeRoute();
    this.responderPhoneNumber=this.activatedRoute.snapshot.paramMap.get('PhoneNumber');
   this.chatService.createGroup(this.responderPhoneNumber);
  }

  private handleChangeRoute() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.chatService.connectionDeleteInGroup();
        this.ngOnInit();
      }
    })
  }

  public messageAdd() {
    let messageAddDto: MessageAddDto = this.messageAddForm.value;
    messageAddDto.responderPhoneNumber = this.responderPhoneNumber;
    this.chatService.messageAdd(messageAddDto);
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

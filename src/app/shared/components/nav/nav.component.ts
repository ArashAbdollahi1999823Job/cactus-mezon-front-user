import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {PresenceService} from "../../Services/presence.service";
import {ChatService} from "../../../chat/chat-service/chat.service";
import {AuthService} from "../../../auth/Services/auth.service";
import {MessageSearchDto} from "../../dto/Chat/message/messageSearchDto";
import {IsReadType} from "../../enum/isReadType";
import {PaginationDto} from "../../dto/base/paginationDto";
import {MessageDto} from "../../dto/Chat/message/messageDto";
import {environment} from "../../../../environments/environment";
import {UserAuthorizeDto} from "../../dto/identity/userAuthorizeDto";
import {TypeService} from "../../../type/type-service/type.service";
import {TypeDto} from "../../dto/type/typeDto";
import {TypeSearchDto} from "../../dto/type/typeSearchDto";
import {TypePictureService} from "../../Services/type-picture.service";
import {TypePictureDto} from "../../dto/typePicture/typePictureDto";
import {TypePictureParamDto} from "../../dto/typePicture/typePictureParamDto";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public fadeMoreNav: boolean = false;
  public backendUrlPicture: string = environment.setting.url.backendUrlPicture;
  public moreNavEl: Element;
  public flashEl: Element;
  public typeDtos: TypeDto[] = [];
  public typeDtos1: TypeDto[] = [];
  public typeDtos2: TypeDto[] = [];
  public typeDtos3: TypeDto[] = [];
  public typeDtos4: TypeDto[] = [];
  public typeDtos5: TypeDto[] = [];
  public typeDtos6: TypeDto[] = [];
  public typeDtos7: TypeDto[] = [];
  public currentLever: number = 1;
  public toggleMenu2: boolean = false;
  constructor(public renderer: Renderer2, public authService: AuthService, public chatService: ChatService, public presenceService: PresenceService, private ef: ElementRef, private typeService: TypeService, private typePictureService: TypePictureService) {
  }

  ngOnInit(): void {
    this.typeGet();
    this.authService.currentUser$.subscribe((userAuthorizeDto: UserAuthorizeDto) => {
      if (userAuthorizeDto) this.messageUnReadGetAll();
    })
  }

  public typeGet(parentTypeId: string = environment.setting.type.typeMatherIndex): void {
    let typeSearchDto: TypeSearchDto = new TypeSearchDto();
    if (this.currentLever==1){
      typeSearchDto.parentTypeId = parentTypeId;
    }
    else{
        typeSearchDto.justParentTypeId = parentTypeId;
    }
    typeSearchDto.minutesCache = Number(environment.cache.type.type);
    this.typeService.typeSearchDtoSet(typeSearchDto);
    this.typeService.typeGetAll().subscribe((paginationTypeDtosRes: PaginationDto<TypeDto>) => {
      if(parentTypeId==environment.setting.type.typeMatherIndex)this.typeDtos1=paginationTypeDtosRes.data;
      if(paginationTypeDtosRes.data.length>0){
        this.typeDtos = paginationTypeDtosRes.data;
        this.typeDtos.forEach(x => {
          this.typePictureGet(x.id);
        })
      }
      else {
        this.currentLever--;
      }
    })
  }
  public typePictureGet(typeId: string): void {
    let typePictureSearchDto = new TypePictureParamDto();
    typePictureSearchDto.typeId = typeId;
    typePictureSearchDto.minutesCache = Number(environment.cache.type.typePicture);
    this.typePictureService.typePictureSetParam(typePictureSearchDto);
    this.typePictureService.typePictureGetAll().subscribe((typePictureRes: TypePictureDto[]) => {
      this.typeDtos.forEach(x => {
        if (x.id == typeId) x.typePictures = [typePictureRes[0]];
      })
    })
  }
  public messageUnReadGetAll(): void {
    let messageSearchDto = new MessageSearchDto();
    messageSearchDto.isRead = IsReadType.UnRead;
    messageSearchDto.responderPhoneNumber = this.authService.getPhoneNumber();
    this.chatService.messageSearchDtoSet(messageSearchDto);
    this.chatService.messageGetAll().subscribe((paginationMessageUnReadDtos: PaginationDto<MessageDto>) => {
      if (paginationMessageUnReadDtos) {
        this.presenceService.messageUnReadDtos.next(paginationMessageUnReadDtos.data);
      }
    })
  }
  public logout(): void {
    if (confirm(environment.messages.common.doYouWantToExit)) {
      this.authService.logout();
    }
  }
  public handleMoreNav(): void {
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
  public toggleMenu(): void {
    this.toggleMenu2 = !this.toggleMenu2;
    let el = this.ef.nativeElement.getElementsByClassName("ul-type-nav")[0];
    if (this.toggleMenu2) {
      this.renderer.setProperty(el, "style", "visibility:visible")
      return;
    }
    this.renderer.setProperty(el, "style", "visibility:hidden")
  }
  public backward(): void {
    console.log(this.currentLever)
    switch (this.currentLever) {
      case 7:{
        this.currentLever--;
         this.typeDtos = this.typeDtos6;
        break;
      }
      case 6:{
        this.currentLever--;
         this.typeDtos = this.typeDtos5;
        break;
      }
      case 5:{
        this.currentLever--;
         this.typeDtos = this.typeDtos4;
        break;
      }
      case 4:{
        this.currentLever--;
        this.typeDtos = this.typeDtos4;
        break;
      }
      case 3:{
        this.currentLever--;
        this.typeDtos = this.typeDtos2;
        break;
      }
      case 2:{
        this.currentLever--;
        this.typeDtos = this.typeDtos1;
        break;
      }
    }
  }
  public forward(typeId: string): void {
    console.log(this.currentLever)
    switch (this.currentLever) {
      case 1:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos2 = this.typeDtos;
        break;
      }
      case 2:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos3 = this.typeDtos;
        break;
      }
      case 3:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos4 = this.typeDtos;
        break;
      }
      case 4:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos5 = this.typeDtos;
        break;
      }
      case 5:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos6 = this.typeDtos;
        break;
      }
      case 6:{
        this.currentLever++;
        this.typeGet(typeId);
        this.typeDtos7 = this.typeDtos;
        break;
      }
    }

  }
}


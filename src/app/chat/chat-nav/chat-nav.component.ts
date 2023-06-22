import {Component, ElementRef, OnInit} from '@angular/core';
import {UserService} from "../../shared/Services/user.service";
import {UserDto} from "../../shared/dto/user/userDto";
import {UserSearchDto} from "../../shared/dto/user/userSearchDto";
import {RoleType} from "../../shared/enum/RoleType";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {PresenceService} from "../../shared/Services/presence.service";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
@Component({
  selector: 'chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})
export class ChatNavComponent implements OnInit {
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  public userDtosBoss: UserDto[];
  public userDtosAdmin: UserDto[];
  public userDtosSeller: UserDto[];
  public myPhoneNumber: string;
  public expand: boolean = false;
  public navEl: Element;
  public logoEl: Element;

  constructor(private userService: UserService, public presenceService: PresenceService, public router: Router, private ef: ElementRef) {
  }

  ngOnInit(): void {
    this.myPhoneNumber = localStorage.getItem(environment.storage.myPhoneNumber);
    this.userGetAsBoss();
    this.userGetAsAdmin();
    this.userGetAsSeller();
  }

  private userGetAsBoss():void {
    let userSearchDto = new UserSearchDto();
    userSearchDto.roleType = RoleType.boss;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      if (res) {
      }
      this.userDtosBoss = res.data;
    })
  }
  private userGetAsAdmin():void {
    let userSearchDto = new UserSearchDto();
    userSearchDto.roleType = RoleType.admin;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      if (res) {
      }
      this.userDtosAdmin = res.data;
    })
  }
  private userGetAsSeller():void {
    let userSearchDto = new UserSearchDto();
    userSearchDto.roleType = RoleType.seller;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      if (res) {
      }
      this.userDtosSeller = res.data;
    })
  }
  public toggleExpand():void {
    this.expand = !this.expand;
    this.navEl = this.ef.nativeElement.getElementsByClassName('nav')[0];
    this.logoEl = this.ef.nativeElement.getElementsByClassName('logo')[0];
    if (this.expand) {
      this.navEl.classList.add('width200');
      this.navEl.classList.remove('width75');
      this.logoEl.classList.add('animateRight');
      this.logoEl.classList.remove('animateLeft');
    } else {
      this.navEl.classList.add('width75');
      this.navEl.classList.remove('width200');
      this.logoEl.classList.remove('animateRight');
      this.logoEl.classList.add('animateLeft');
    }
  }
}

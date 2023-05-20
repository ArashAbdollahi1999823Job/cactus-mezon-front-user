import {Component, OnInit} from '@angular/core';
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
  public backendUrlPicture=environment.backendUrlPicture;
  public userDtosBoss:UserDto[];
  public userDtosAdmin:UserDto[];
  public userDtosSeller:UserDto[];
  public myPhoneNumber:string;
  constructor(private userService:UserService,public presenceService:PresenceService,public router:Router) {
  }
  ngOnInit(): void {
    this.myPhoneNumber=localStorage.getItem(environment.storage.myPhoneNumber);
    this.userGetAsBoss();
    this.userGetAsAdmin();
    this.userGetAsSeller();
  }
  private userGetAsBoss(){
    let userSearchDto=new UserSearchDto();
    userSearchDto.roleType=RoleType.boss;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>)=>{
      if(res){}
      this.userDtosBoss=res.data;
    })
  }
  private userGetAsAdmin(){
    let userSearchDto=new UserSearchDto();
    userSearchDto.roleType=RoleType.admin;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>)=>{
      if(res){}
      this.userDtosAdmin=res.data;
    })
  }
  private userGetAsSeller(){
    let userSearchDto=new UserSearchDto();
    userSearchDto.roleType=RoleType.seller;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>)=>{
      if(res){}
      this.userDtosSeller=res.data;
    })
  }
}

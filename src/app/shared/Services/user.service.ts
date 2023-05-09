import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserSearchDto} from "../dto/user/userSearchDto";
import {PaginationDto} from "../dto/base/paginationDto";
import {UserDto} from "../dto/user/userDto";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private backendUrlUser = environment.backendUrlUser;
  public userSearchDto = new UserSearchDto();
  constructor(private readonly http: HttpClient) {}
  public userGetAll(): Observable<PaginationDto<UserDto>> {
    let requestUserParam = this.generateUserParam();
    return this.http.get<PaginationDto<UserDto>>(`${this.backendUrlUser}/UserUser/UserGetAll`, {params: requestUserParam});
  }
  private generateUserParam() {
    let requestUserParam = new HttpParams();
    if (this.userSearchDto.searchPhoneNumber) requestUserParam = requestUserParam.append("searchPhoneNumber", this.userSearchDto.searchPhoneNumber);
    if (this.userSearchDto.searchUserName) requestUserParam = requestUserParam.append("searchUserName", this.userSearchDto.searchUserName);
    if (this.userSearchDto.id) requestUserParam = requestUserParam.append("id", this.userSearchDto.id);
    if (this.userSearchDto.phoneNumberConfirmed) requestUserParam = requestUserParam.append("phoneNumberConfirmed", this.userSearchDto.phoneNumberConfirmed);
    requestUserParam = requestUserParam.append('pageIndex', this.userSearchDto.pageIndex);
    requestUserParam = requestUserParam.append('pageSize', this.userSearchDto.pageSize);
    requestUserParam = requestUserParam.append('roleType', this.userSearchDto.roleType);
    requestUserParam = requestUserParam.append('sortType', this.userSearchDto.sortType);
    return requestUserParam;
  }
  public userSearchDtoGet() {
    return this.userSearchDto;
  }
  public userSearchDtoSet(userSearchDto: UserSearchDto) {
    this.userSearchDto = userSearchDto;
  }
}

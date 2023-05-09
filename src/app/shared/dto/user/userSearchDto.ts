import {RoleType} from "../../enum/RoleType";
import {PhoneConfirmType} from "../../enum/phoneConfirmType";
import {SortType} from "../../enum/sortType";
export class UserSearchDto {
  pageIndex:number=1
  pageSize:number=7
  searchUserName: string
  searchPhoneNumber: string
  id: string
  phoneNumberConfirmed: PhoneConfirmType=PhoneConfirmType.notImportant;
  roleType: RoleType=RoleType.notImportant
  sortType: SortType=SortType.desc
}

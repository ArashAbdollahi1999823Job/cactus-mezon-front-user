import {ActiveType} from "../../enum/activeType";
import {SortType} from "../../enum/sortType";

export class StoreSearchDto {
  public minutesCache:number=60;
  slug:string;
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  phoneNumber:string;
  mobileNumber:string;
  userId:string;
  activeType:ActiveType=ActiveType.notImportant;
  sortType:SortType=SortType.desc;
}

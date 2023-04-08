import {ActiveType} from "../../enum/activeType";
import {SortType} from "../../enum/sortType";


export class TypeParamDto {
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  parentTypeId:number
  activeType:ActiveType=ActiveType.notImportant;
  sortType:SortType=SortType.desc;
}

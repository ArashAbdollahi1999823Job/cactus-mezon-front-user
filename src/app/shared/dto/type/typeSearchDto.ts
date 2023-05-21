import {ActiveType} from "../../enum/activeType";
import {SortType} from "../../enum/sortType";


export class TypeSearchDto {
  slug:string;
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  parentTypeId:string
  activeType:ActiveType=ActiveType.notImportant;
  sortType:SortType=SortType.desc;
  justParentTypeId:string;
}

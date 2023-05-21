import {SortType} from "../../enum/sortType";

export class BrandSearchDto {
  id:string;
  pageIndex:number=1;
  pageSize:number=7;
  name:string;
  sortType:SortType=SortType.desc;
}

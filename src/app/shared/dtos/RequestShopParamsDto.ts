import {sortType} from "../enums/sortType";

export class RequestShopParamsDto{
  brandId?:number=0;
  typeId?:number=0;
  sortType:sortType=sortType.Desc;
  sort:number=1;
  search: '' | undefined;
  pageSize:number=6;
  pageIndex:number=1;
}

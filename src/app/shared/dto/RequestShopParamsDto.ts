import {SortType} from "../enum/sortType";

export class RequestShopParamsDto{
  brandId?:number=0;
  typeId?:number=0;
  sortType:SortType=SortType.desc;
  sort:number=1;
  search: '' | undefined;
  pageSize:number=6;
  pageIndex:number=1;
}

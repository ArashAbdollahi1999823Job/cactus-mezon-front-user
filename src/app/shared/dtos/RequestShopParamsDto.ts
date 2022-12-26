export class RequestShopParamsDto{
  brandId?:number=0;
  typeId?:number=0;
  eTypeSort:1|2=1;
  sort:number=1;
  search: '' | undefined;
  pageSize:number=6;
  pageIndex:number=1;
}

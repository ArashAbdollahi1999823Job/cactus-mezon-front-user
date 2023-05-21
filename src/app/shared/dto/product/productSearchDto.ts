import {ActiveType} from "../../enum/activeType";
import {SortType} from "../../enum/sortType";

export class ProductSearchDto {
  public pageIndex: number=1;
  public pageSize: number=10;
  public id: string;
  public isActive: ActiveType=ActiveType.notImportant;
  public name: string;
  public slug: string;
  public price: number;
  public inventoryId: string;
  public typeId: string;
  public brandId: string;
  public off: number;
  public sortType: SortType=SortType.desc;
  public storeId: string;
  public user:boolean=true;
}

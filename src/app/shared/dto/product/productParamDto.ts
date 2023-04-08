import {ActiveType} from "../../enum/activeType";
import {SortType} from "../../enum/sortType";

export class ProductParamDto{
  public pageIndex: number=1;
  public pageSize: number=10;
  public id: number;
  public isActive: ActiveType=ActiveType.notImportant;
  public name: string;
  public slug: string;
  public price: number;
  public inventoryId: number;
  public typeId: number;
  public brandId: number;
  public off: number;
  public sortType: SortType=SortType.desc;
  public storeId: string;
}

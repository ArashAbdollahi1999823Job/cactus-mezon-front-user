import {ICustomerBasketItemsDto} from "./ICustomerBasketItemsDto";

export interface ICustomerBasketDto{
  id:string
  customerBasketItems:ICustomerBasketItemsDto[];
}

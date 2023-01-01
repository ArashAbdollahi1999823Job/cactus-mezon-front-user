import {ICustomerBasketDto} from "./ICustomerBasketDto";
import {ICustomerBasketItemsDto} from "./ICustomerBasketItemsDto";
import {v4 as uuidv4} from "uuid";


export class CustomerBasketDto implements ICustomerBasketDto{
  id=uuidv4();
  customerBasketItems: ICustomerBasketItemsDto[]=[];
}

import {Component, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {ICustomerBasketDto} from "../../shared/dtos/basket/ICustomerBasketDto";
import {BasketService} from "../Services/basket.service";
import {ICustomerBasketItemsDto} from "../../shared/dtos/basket/ICustomerBasketItemsDto";
@Component({
  selector: 'app-basket-c',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  customerBasket$ : Observable<ICustomerBasketDto> | undefined;
  constructor(private title: Title, private basketService: BasketService) {this.title.setTitle("سبد خرید فروشگاه بزرگ کاکتوس")}
  ngOnInit(): void {
    this.customerBasket$=this.basketService.customerBasket$;
  }
  increaseItemQuantity(item:ICustomerBasketItemsDto) {
    // @ts-ignore
    this.basketService.increaseItemQuantity(item.id).subscribe();
  }
  decreaseItemQuantity(item:ICustomerBasketItemsDto) {
    // @ts-ignore
    this.basketService.decreaseItemQuantity(item.id).subscribe();
  }
}

import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../../basket/Services/basket.service";
import {Observable} from "rxjs";
import {ICustomerBasketDto} from "../../dtos/basket/ICustomerBasketDto";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
   customerBasket$ : Observable<ICustomerBasketDto> | undefined;
  constructor(private basketService:BasketService) {
  }
  ngOnInit(): void {
    this.customerBasket$=this.basketService.customerBasket$;
  }

}


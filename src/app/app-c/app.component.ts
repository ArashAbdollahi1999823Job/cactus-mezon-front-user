import {Component, OnInit} from '@angular/core';
import {BasketService} from "../basket/Services/basket.service";
import {environment} from "../../environments/environment";
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'فروشگاه بزرگ کاکتوس';
  constructor(private basketService:BasketService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.basketService.getCustomerBasket(localStorage.getItem(environment.keyBasketLocalStorage)).subscribe((res)=>{
      console.log(res)
    })
  }
}

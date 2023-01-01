import {Component, OnInit} from '@angular/core';
import {BasketService} from "../Services/basket.service";
import {Observable} from "rxjs";
import {IBasketTotal} from "../../shared/dtos/basket/IBasketTotal";
@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})


export class OrderTotalComponent implements OnInit{
  public basketTotal$:Observable<IBasketTotal>|undefined;
  constructor(private basketService:BasketService) {  }

  ngOnInit(): void {
    this.basketTotal$=this.basketService.totalBasket$;
  }
}

import {Component, OnInit} from '@angular/core';
import {BasketService} from "../basket/Services/basket.service";
import {environment} from "../../environments/environment";
import {IUserDto} from "../shared/dto/identity/IUserDto";
import {AuthService} from "../auth/Services/auth.service";
import {allPageAnimation} from "../shared/animations/allPageAnimation";
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[allPageAnimation]
})
export class AppComponent implements OnInit{
  title = 'فروشگاه بزرگ کاکتوس';
  constructor(private basketService:BasketService,private authService:AuthService) {}

  ngOnInit(): void {
    /*this.initialBasket();*/
    this.initialUser();
  }


  private initialUser() {
    const user=<IUserDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      this.authService.setCurrentUser(user)
    }
  }
  private initialBasket() {
    this.basketService.getCustomerBasket(localStorage.getItem(environment.keyBasketLocalStorage)).subscribe((res) => {
    })
  }
}

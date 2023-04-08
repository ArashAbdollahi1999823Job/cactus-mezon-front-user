import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {ICustomerBasketDto} from "../../shared/dto/basket/ICustomerBasketDto";
import {HttpClient} from "@angular/common/http";
import {IProductDto} from "../../shared/dto/product/IProductDto";
import {ICustomerBasketItemsDto} from "../../shared/dto/basket/ICustomerBasketItemsDto";
import {CustomerBasketDto} from "../../shared/dto/basket/CustomerBasketDto";
import {IBasketTotal} from "../../shared/dto/basket/IBasketTotal";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private backendUrl = environment.backendUrl;
  // @ts-ignore
  private customerBasket = new BehaviorSubject<ICustomerBasketDto>(null);//need this to do next
  public customerBasket$ = this.customerBasket.asObservable();//need this to do subscribe
  // @ts-ignore
  private totalBasket = new BehaviorSubject<IBasketTotal>(null);
  public totalBasket$ = this.totalBasket.asObservable();

  constructor(private http: HttpClient) {
  }

  increaseItemQuantity(id: number) {
    const basket = this.getCurrentCustomerBasket();
    const index = basket.customerBasketItems.findIndex(x => x.id === id);
    if (id != -1) {
      basket.customerBasketItems[index].quantity += 1;
      return this.setCustomerBasket(basket);
    }
    return of(null)
  }
  decreaseItemQuantity(id: number) {
    const basket = this.getCurrentCustomerBasket();
    const index = basket.customerBasketItems.findIndex(x => x.id === id);
    if (id != -1) {
      const item = basket.customerBasketItems[index]
      if (item.quantity > 1) {
        item.quantity-=1;
        return this.setCustomerBasket(basket);
      } else {
        return this.deleteItemFromBasket(item.id);
      }
    }
    return of(null)
  }
  deleteItemFromBasket(id: number) {
    if (this.getCurrentCustomerBasket()) {
      const basketId = this.getCurrentCustomerBasket().id;
      return this.http.delete<ICustomerBasketDto>(`${this.backendUrl}/basket/${basketId}/${id}`).pipe(tap((response) => {
        if (response.customerBasketItems.length == 0) {
          // @ts-ignore
          this.customerBasket.next(null);
          // @ts-ignore
          this.totalBasket.next(null);
          localStorage.removeItem(environment.keyBasketLocalStorage);
        } else {
          this.customerBasket.next(response);
          this.calculateTotal();
        }
      }))
    }
    return of(null)
  }
  getCustomerBasket(customerBasketId: string): Observable<ICustomerBasketDto> {
    return this.http.get<ICustomerBasketDto>(`${this.backendUrl}/basket/${customerBasketId}`).pipe(map((customerBasket) => {
      this.customerBasket.next(customerBasket);
      this.calculateTotal();
      return customerBasket
    }))
  }

  setCustomerBasket(customerBasket: ICustomerBasketDto): Observable<ICustomerBasketDto> {
    return this.http.post<ICustomerBasketDto>(`${this.backendUrl}/basket`, customerBasket).pipe(map((customerBasket) => {
      this.customerBasket.next(customerBasket);
      this.calculateTotal();
      return customerBasket;
    }))
  }

  deleteCustomerBasket(id: string) {
  }

  addCustomerBasketItemToCustomerBasket(product: IProductDto, quantity: number = 1) {
    //product => ICustomerBasketItem
    const customerBasketItemToAdd: ICustomerBasketItemsDto = this.mapProductToCustomerBasketItem(product, quantity);
    //exist basket ? true | false
    const customerBasket = this.getCurrentCustomerBasket() ?? this.createBasket();
    //customBasketItems => addItem | update
    customerBasket.customerBasketItems = this.addOrUpdateCustomerBasketItems(customerBasketItemToAdd, customerBasket.customerBasketItems, quantity);
    //setBasket
    return this.setCustomerBasket(customerBasket);
  }

  private createBasket(): CustomerBasketDto {
    const customerBasket = new CustomerBasketDto();
    localStorage.setItem(environment.keyBasketLocalStorage, customerBasket.id);
    return customerBasket;
  }

  private mapProductToCustomerBasketItem(product: IProductDto, quantity: number): ICustomerBasketItemsDto {
    return {
      product: product.title,
      quantity: quantity,
      id: product.id,
      type: product.productType,
      brand: product.productBrand,
      discount: 0,
      pictureThumbnailUrl: product.pictureThumbnailUrl,
      price: product.price
    }
  }

  private getCurrentCustomerBasket() {
    return this.customerBasket.getValue();
  }

  private addOrUpdateCustomerBasketItems(customerBasketItemToAdd: ICustomerBasketItemsDto, customerBasketItems: ICustomerBasketItemsDto[], quantity: number): ICustomerBasketItemsDto[] {
    //id= productId
    const index = customerBasketItems.findIndex(x => x.id == customerBasketItemToAdd.id);
    if (index === -1) {
      //new customerBasketItem
      customerBasketItems.push(customerBasketItemToAdd)
    } else {
      //updateBasketItems
      customerBasketItems[index].quantity += quantity;
    }
    return customerBasketItems;
  }

  private calculateTotal() {
    const basket = this.getCurrentCustomerBasket();
    let shipping = 0;
    let subTotal = basket.customerBasketItems.reduce((init, item) => {
      return item.price * item.quantity + init;
    }, 0);
    let total = subTotal + shipping;
    this.totalBasket.next({shipping: shipping, total: total, subTotal: subTotal})
  }
}

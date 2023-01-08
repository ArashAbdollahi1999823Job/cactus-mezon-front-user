import {Component, Input} from '@angular/core';
import {IPaginationResponseDto} from "../../shared/dtos/IPaginationResponseDto";
import {IProductDto} from "../../shared/dtos/product/IProductDto";
import {BasketService} from "../../basket/Services/basket.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

export class SearchResultComponent {
  constructor(private basketService: BasketService) {
  }

  @Input("products") products: IPaginationResponseDto<IProductDto> | undefined;

  showDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "30%";
    cardDetails.style.width = "60px";
    cardDetails.style.borderRight = "1px solid black";
    // @ts-ignore
    detailsButton.forEach(x => {
      x.style.fontSize = '1.7vh';
    })
  }

  hideDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "0";
    // @ts-ignore
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "15px";
    cardDetails.style.borderRight = "0px solid black";
  }

  addItemToBasket(item: any) {
    this.basketService.addCustomerBasketItemToCustomerBasket(item, 1).subscribe((res)=>{
    })
  }
}

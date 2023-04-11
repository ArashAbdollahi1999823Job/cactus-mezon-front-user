import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";
import {environment} from "../../../../environments/environment.prod";


@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit{
  @Input('productDto') productDto: ProductDto;
  public backendUrlPicture=environment.backendUrlPicture;
  @ViewChild('timerEl',{static:false}) timerEl:ElementRef;
  ngOnInit(): void {
    this.timer()
  }
  showDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "30%";
    cardDetails.style.width = "60px";
    cardDetails.style.borderRight = "1px solid black";
    detailsButton.forEach(x => {
      x.style.fontSize = '1.7vh';
    })
  }
  hideDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "0";
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "15px";
    cardDetails.style.borderRight = "0px solid black";
  }
  timer() {
    if (this.productDto.off) {
      let end = new Date(this.productDto.off.endDate)
      let now = new Date();
      let sec=
        ((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(),end.getHours(),end.getMinutes(),end.getSeconds())
          -Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()))/ (1000) );
        setInterval(() => {
          sec=sec-1
          const seconds = Math.floor(sec % 60);
          const minutes = Math.floor((sec % 3600) / 60);
          const hours = Math.floor((sec % (3600 * 24)) / 3600);
          const days = Math.floor(sec / (3600 * 24));
          this.timerEl.nativeElement.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
        }, 1000)
      }
  }
}
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  @Input('productDto') productDto: ProductDto;
  @ViewChild('timerEl',{static:false}) timerEl:ElementRef;
  public backendUrlPicture = environment.backendUrlPicture;

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

  timer() {
    if (this.productDto.off) {
      var end = new Date(this.productDto.off.endDate)
      var now = new Date();
      var sec=
        ((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(),end.getHours(),end.getMinutes(),end.getSeconds())
          -Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()))/ (1000) );
      if(sec>0) {
        setInterval(() => {
          sec=sec-1
          const seconds = Math.floor(sec % 60);
          const minutes = Math.floor((sec % 3600) / 60);
          const hours = Math.floor((sec % (3600 * 24)) / 3600);
          const days = Math.floor(sec / (3600 * 24));
          this.timerEl.nativeElement.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
        }, 1000)
      }
      else{
        this.productDto.off==null;
      }
    }
  }
}

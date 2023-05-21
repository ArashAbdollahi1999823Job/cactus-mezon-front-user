import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";
import {environment} from "../../../../environments/environment.prod";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {Subscription} from "rxjs";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
@Component({
  selector: 'card-search-product-result',
  templateUrl: './card-search-product-result.component.html',
  styleUrls: ['./card-search-product-result.component.scss']
})
export class CardSearchProductResultComponent implements OnInit{
  @Input('productDto') productDto: ProductDto;
  public backendUrlPicture=environment.backendUrlPicture;
  @ViewChild('timerEl',{static:false}) timerEl:ElementRef;
  private subscription:Subscription;

  ngOnInit(): void {
    this.timer()
    this.productPictureGetAll(this.productDto.id, 1);
  }
  showDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if(colors){
      colors.style.height='25%'
    }
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
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if(colors) {
      colors.style.height = '0'
    }
    cardEnterProduct.style.width = "0";
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "0px";
    cardDetails.style.borderRight = "0px solid black";
  }
  constructor(private clipboard:Clipboard,private toastService:ToastrService,private productPictureService:ProductPictureService) {}
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
  copyProductUrl(slug: string) {
    const successful = this.clipboard.copy(slug);
    if (successful) this.toastService.success('ادرس با موفقیت کپی شد.')
  }
  public productPictureGetAll(productId: string, sort: number){
    let productPictureParamDto = new ProductPictureSearchDto();
    productPictureParamDto.productId = productId;
    productPictureParamDto.sort = sort;
    this.productPictureService.productPictureSearchDtoSet(productPictureParamDto);
    this.subscription= this.productPictureService.productPictureGetAll().subscribe((productPictureDtosRes: ProductPictureDto[]) => {
        if (productPictureDtosRes) {
          this.productDto.productPictures=productPictureDtosRes;
        }
      }
    )
  }
}

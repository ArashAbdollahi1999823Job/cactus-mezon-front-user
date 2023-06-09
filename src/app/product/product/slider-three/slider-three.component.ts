import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {environment} from "../../../../environments/environment";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {Subscription} from "rxjs";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../shared/dto/product/productDto";
@Component({
  selector: 'slider-three',
  templateUrl: './slider-three.component.html',
  styleUrls: ['./slider-three.component.scss']
})
export class SliderThreeComponent implements OnChanges {
  @Input('productDto') productDto:ProductDto;
  private subscription: Subscription;
  public productPictureDtos: ProductPictureDto[];
  public backendUrlPicture = environment.backendUrlPicture;
  constructor(private productPictureService: ProductPictureService,private clipboard:Clipboard,private toastService:ToastrService) {
  }
  ngOnChanges(): void {
    this.productPicturesGet();
  }
  public productPicturesGet():void {
    let productPictureSearchDto = new ProductPictureSearchDto();
    productPictureSearchDto.startRange = environment.productSetting.sliderStart;
    productPictureSearchDto.endRange = environment.productSetting.sliderEnd;
    productPictureSearchDto.productId = this.productDto.id;
    this.productPictureService.productPictureSearchDtoSet(productPictureSearchDto);
    this.subscription = this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
      if (res) {
        this.productPictureDtos=res;
      }
    })
  }
  public changePicture(id: string,event:HTMLElement):void {
   let element= document.getElementById(id.toString());
    let lasElement=document.getElementsByClassName('block')[0];
    let pictureOne=document.getElementsByClassName('picture-one')
    for (let i=0;i<=pictureOne.length;i++){
      pictureOne.item(i)?.classList?.remove('scale')
    }
    event.classList.add('scale');
    if(id.toString()==lasElement.id)return;
    lasElement.classList.add('fadeOut');
    setTimeout(()=>{
      lasElement.classList.add('deActive');
      element.classList.add('block');
      element.classList.remove('deActive');
      element.classList.add('fadeIn');
      lasElement.classList.remove('fadeOut','block')
    },350)
  }
  public copyProductUrl():void {
    const successful = this.clipboard.copy(`${location.href}`);
    if (successful) this.toastService.success(environment.messages.common.addressCopySuccess)
  }
}

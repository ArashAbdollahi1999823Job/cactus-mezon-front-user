import {Component, ElementRef, Input, OnChanges} from '@angular/core';
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {environment} from "../../../../environments/environment";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {Subscription} from "rxjs";


@Component({
  selector: 'slider-three',
  templateUrl: './slider-three.component.html',
  styleUrls: ['./slider-three.component.scss']
})
export class SliderThreeComponent implements OnChanges {
  @Input('productId') productId: number;
  private subscription: Subscription;
  public productPictureDtos: ProductPictureDto[];
  public backendUrlPicture = environment.backendUrlPicture;
  public idToShow:number;

  constructor(private productPictureService: ProductPictureService,private el:ElementRef) {
  }

  ngOnChanges(): void {
    this.productPicturesGet();
  }

  public productPicturesGet() {
    let productPictureSearchDto = new ProductPictureSearchDto();
    productPictureSearchDto.startRange = environment.productSetting.sliderStart;
    productPictureSearchDto.endRange = environment.productSetting.sliderEnd;
    productPictureSearchDto.productId = this.productId;
    this.productPictureService.productPictureSearchDtoSet(productPictureSearchDto);
    this.subscription = this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
      if (res) {
        this.productPictureDtos=res;

      }
    })
  }


  changePicture(id: number) {
   let element= document.getElementById(id.toString());
    let lasElement=document.getElementsByClassName('block')[0];
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
}

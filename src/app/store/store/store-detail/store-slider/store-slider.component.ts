import {Component, Input} from '@angular/core';
import {StoreUserPictureDto} from "../../../../shared/dto/storePicture/storeUserPictureDto";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'store-slider',
  templateUrl: './store-slider.component.html',
  styleUrls: ['./store-slider.component.scss']
})
export class StoreSliderComponent {
  @Input('storePictureDtos') storePictureDtos:StoreUserPictureDto[];
  @Input('sellerPhoneNumber') sellerPhoneNumber:string;

  public backendUrlPicture = environment.setting.url.backendUrlPicture;

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

}

import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {StoreDto} from "../../../../../shared/dto/store/storeDto";
import {environment} from "../../../../../../environments/environment";
import {Router} from "@angular/router";
import {StorePictureService} from "../../../../store-service/store-picture.service";
import {StorePictureSearchDto} from "../../../../../shared/dto/storePicture/storePictureSearchDto";
import {StoreUserPictureDto} from "../../../../../shared/dto/storePicture/storeUserPictureDto";
@Component({
  selector: 'store-card',
  templateUrl: './store-card.html',
  styleUrls: ['./store-card.scss']
})
export class StoreCard implements OnInit {
  @Input('storeDto') storeDto: StoreDto;
  public storePictureDtos:StoreUserPictureDto[];
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  private subscription: Subscription;

  ngOnInit(): void {
    this.storePictureGetAll(this.storeDto.id, 1);
  }
  public showDetails(event: any): void {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if (colors) {
      colors.style.height = '25%'
    }
    cardEnterProduct.style.width = "30%";
    cardDetails.style.width = "60px";
    cardDetails.style.borderRight = "1px solid black";
    detailsButton.forEach(x => {
      x.style.fontSize = '1.7vh';
    })
  }

  public hideDetails(event: any): void {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if (colors) {
      colors.style.height = '0'
    }
    cardEnterProduct.style.width = "0";
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "0px";
    cardDetails.style.borderRight = "0px solid black";
  }

  constructor(private clipboard: Clipboard, private toastService: ToastrService, private storePictureService: StorePictureService) {
  }
  public storePictureGetAll(productId: string, sort: number): void {
    let storePictureSearchDto = new StorePictureSearchDto();
    storePictureSearchDto.storeId = productId;
    storePictureSearchDto.sort = sort;
    this.storePictureService.storePictureSearchDtoSet(storePictureSearchDto);
    this.subscription = this.storePictureService.storePictureGetAll().subscribe((storePictureDtosRes: StoreUserPictureDto[]) => {
        if (storePictureDtosRes) {
         this.storePictureDtos=storePictureDtosRes;
        }
      }
    )
  }
}

import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";
import {environment} from "../../../../environments/environment";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {Subscription} from "rxjs";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {UserAuthorizeDto} from "../../../shared/dto/identity/userAuthorizeDto";
import {FavoriteAddDto} from "../../../shared/dto/favorite/favoriteAddDto";
import {FavoriteDeleteDto} from "../../../shared/dto/favorite/favoriteDeleteDto";
import {AuthService} from "../../../auth/Services/auth.service";
import {FavoriteService} from "../../favorite-service/favorite.service";

@Component({
  selector: 'card-favorite-product-result',
  templateUrl: './card-favorite-product-result.component.html',
  styleUrls: ['./card-favorite-product-result.component.scss']
})
export class CardFavoriteProductResultComponent implements OnInit {
  @Input('productDto') productDto: ProductDto;
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  @ViewChild('timerEl', {static: false}) timerEl: ElementRef;
  private subscription: Subscription;
  @Output('favoriteUpdate') favoriteUpdate=new EventEmitter<boolean>();

  ngOnInit(): void {
    this.timer()
    this.productPictureGetAll(this.productDto.id, 1);
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

  constructor(private clipboard: Clipboard, private toastService: ToastrService, private productPictureService: ProductPictureService, private authService: AuthService, private favoriteService: FavoriteService) {
  }

  public timer(): void {
    if (this.productDto.off) {
      let end = new Date(this.productDto.off.endDate)
      let now = new Date();
      let sec =
        ((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds())
          - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())) / (1000));
      setInterval(() => {
        sec = sec - 1
        const seconds = Math.floor(sec % 60);
        const minutes = Math.floor((sec % 3600) / 60);
        const hours = Math.floor((sec % (3600 * 24)) / 3600);
        const days = Math.floor(sec / (3600 * 24));
        this.timerEl.nativeElement.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
      }, 1000)
    }
  }

  public copyProductUrl(slug: string): void {
    const successful = this.clipboard.copy(`${location.href}/${slug}`);
    if (successful) this.toastService.success(environment.messages.common.addressCopySuccess)
  }

  public productPictureGetAll(productId: string, sort: number): void {
    let productPictureParamDto = new ProductPictureSearchDto();
    productPictureParamDto.productId = productId;
    productPictureParamDto.sort = sort;
    this.productPictureService.productPictureSearchDtoSet(productPictureParamDto);
    this.subscription = this.productPictureService.productPictureGetAll().subscribe((productPictureDtosRes: ProductPictureDto[]) => {
        if (productPictureDtosRes) {
          this.productDto.productPictures = productPictureDtosRes;
        }
      }
    )
  }

  public favoriteDelete(productId: string): void {
    if(confirm(environment.messages.favorite.doYouWantToDeleteFavorite)){
      let favoriteDeleteDto = new FavoriteDeleteDto();
      favoriteDeleteDto.userId = this.authService.getUserId();
      favoriteDeleteDto.productId = productId;

      this.subscription = this.favoriteService.favoriteDelete(favoriteDeleteDto).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.favorite.favoriteDeleteSuccess);
          this.favoriteUpdate.emit(true);
        }
      })
    }
  }
}

import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";
import {environment} from "../../../../environments/environment";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../auth/Services/auth.service";
import {UserAuthorizeDto} from "../../../shared/dto/identity/userAuthorizeDto";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FavoriteAddDto} from "../../../shared/dto/favorite/favoriteAddDto";
import {FavoriteService} from "../../../favorite/favorite-service/favorite.service";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";

@Component({
  selector: 'slide-one',
  templateUrl: './slide-one.component.html',
  styleUrls: ['./slide-one.component.scss']
})
export class SlideOneComponent implements OnInit, OnDestroy {
  @Input('productDto') productDto: ProductDto;
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  @ViewChild('timerEl', {static: false}) timerEl: ElementRef;
  private subscription: Subscription;

  ngOnInit(): void {
    this.productPictureGetAll();
    this.timer();
  }

  public showDetails(event: any): void {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    let cardBrandProduct = event.srcElement.querySelectorAll('.card-brand-product')[0];
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if (colors) {
      colors.style.height = '25%'
    }
    cardEnterProduct.style.width = "30%";
    if(cardBrandProduct){
      cardBrandProduct.style.width = "70%";
    }
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
    let cardBrandProduct = event.srcElement.querySelectorAll('.card-brand-product')[0];
    let colors = event.srcElement.querySelectorAll('.colors')[0];
    if (colors) {
      colors.style.height = '0'
    }
    cardEnterProduct.style.width = "0";
    if(cardBrandProduct){
      cardBrandProduct.style.width = "0";
    }
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "0px";
    cardDetails.style.borderRight = "0px solid black";
  }

  constructor(private clipboard: Clipboard, private toastService: ToastrService, private authService: AuthService, private router: Router, private favoriteService: FavoriteService, private productPictureService: ProductPictureService) {
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

  public favoriteAdd(productId: string):void {
    let checkLogin;
    this.subscription = this.authService.currentUser$.subscribe((user: UserAuthorizeDto) => {
      checkLogin = !!user;
    })

    if (checkLogin == false) {
      this.toastService.info(environment.messages.favorite.pleaseInter);
      this.router.navigateByUrl('auth/login');
      return;
    }

    let favoriteAddDto = new FavoriteAddDto();
    favoriteAddDto.userId = this.authService.getUserId();
    favoriteAddDto.productId = productId;

    this.subscription = this.favoriteService.favoriteAdd(favoriteAddDto).subscribe((res: boolean) => {
      if (res == true) this.toastService.success(environment.messages.favorite.favoriteAddSuccess)
    })
  }
  public productPictureGetAll(): void {
    let productPictureParamDto = new ProductPictureSearchDto();
    productPictureParamDto.productId = this.productDto.id;
    productPictureParamDto.sort = Number(environment.setting.product.sortThumbnail);
    this.productPictureService.productPictureSearchDtoSet(productPictureParamDto);
    this.subscription = this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
        if (res) {
          this.productDto.productPictures = res;
        }
      }
    )
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

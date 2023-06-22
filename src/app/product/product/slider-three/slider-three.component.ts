import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {environment} from "../../../../environments/environment";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {Subscription} from "rxjs";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {AuthService} from "../../../auth/Services/auth.service";
import {FavoriteService} from "../../../favorite/favorite-service/favorite.service";
import {UserAuthorizeDto} from "../../../shared/dto/identity/userAuthorizeDto";
import {Router} from "@angular/router";
import {FavoriteAddDto} from "../../../shared/dto/favorite/favoriteAddDto";
@Component({
  selector: 'slider-three',
  templateUrl: './slider-three.component.html',
  styleUrls: ['./slider-three.component.scss']
})
export class SliderThreeComponent implements OnChanges,OnDestroy {
  @Input('productDto') productDto:ProductDto;
  private subscription: Subscription;
  public productPictureDtos: ProductPictureDto[];
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  constructor(private productPictureService: ProductPictureService,private router:Router,private clipboard:Clipboard,private toastService:ToastrService, private favoriteService: FavoriteService,private authService:AuthService) {
  }
  ngOnChanges(): void {
    this.productPicturesGet();
  }
  public productPicturesGet():void {
    let productPictureSearchDto = new ProductPictureSearchDto();
    productPictureSearchDto.startRange = environment.role.product.sliderStart;
    productPictureSearchDto.endRange = environment.role.product.sliderEnd;
    productPictureSearchDto.productId = this.productDto?.id;
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
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

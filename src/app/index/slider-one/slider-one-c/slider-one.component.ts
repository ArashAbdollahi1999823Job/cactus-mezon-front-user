import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {ProductSearchDto} from "../../../shared/dto/product/productSearchDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {ProductPictureSearchDto} from "../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
import {ProductService} from "../../../product/product-service/product.service";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {Subscription} from "rxjs";
import {TypeService} from "../../../type/type-service/type.service";
import {TypeSearchDto} from "../../../shared/dto/type/typeSearchDto";

@Component({
  selector: 'slider-one',
  templateUrl: './slider-one.component.html',
  styleUrls: ['./slider-one.component.scss']
})
export class SliderOneComponent implements OnInit ,OnDestroy {
  slider: Element;
  @Input("typeDto") typeDto: TypeDto;
  @Input("index") index:number;
  public haveChild: boolean = false;
  @ViewChild('key') key: ElementRef;
  public subscription: Subscription;
  public pageIndex = 1;

  constructor(private productService: ProductService, private productPictureService: ProductPictureService, private typeService: TypeService,private el:ElementRef) {
  }
  ngOnInit(): void {
    this.changeBg();
    setTimeout(() => {
      this.btnClickLeft();
    }, 1000)
    this.checkChild()
  }

  private changeBg() {
    if (this.index % 2 == 0) {
      this.el.nativeElement.querySelector(".container-slider-card").classList.add('bg-black-a7')
    } else if (this.index % 2 == 1) {
      this.el.nativeElement.querySelector(".container-slider-card").classList.add('bg-brown-a3')
    }
  }
  public checkChild() {
    let typeParamDto = new TypeSearchDto();
    typeParamDto.pageIndex = 1;
    typeParamDto.pageSize = 1;
    typeParamDto.justParentTypeId = this.typeDto.id;
    this.typeService.typeSearchDtoSet(typeParamDto);
    this.typeService.typeGetAll().subscribe((res:PaginationDto<TypeDto>) => {
      if (res) {
        if (res.data[0] != null) {
          this.haveChild = true;
        }
      }
    })
  }
  btnClickRight() {
    this.slider = this.key.nativeElement;
    let scrollRight = setInterval(() => {
      this.slider.scrollLeft += 3;
    }, 1)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 600)
  }
  btnClickLeft() {
    this.slider = this.key.nativeElement;
    let scrollRight = setInterval(() => {
      this.slider.scrollLeft -= 2;
    }, 3)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 630)
    if (this.slider.scrollWidth + this.slider.scrollLeft <= window.innerWidth + 240) {
      this.pageIndex++;
      this.productGetAll(this.typeDto.id);
    }
  }
  public productGetAll(typeId: string) {
    let productParamDto = new ProductSearchDto();
    productParamDto.pageSize = 5;
    productParamDto.pageIndex = this.pageIndex;
    productParamDto.typeId = typeId;
    this.productService.productSearchDtoSet(productParamDto);
    this.subscription = this.productService.productGetAll().subscribe((res: PaginationDto<ProductDto>) => {
      if (res) {
        this.pageIndex=res.pageIndex;
        res.data.forEach(x => {
          this.typeDto.products.push(x);
          this.productPictureGetAll(x.id, 1);
        });
      }
    })
  }
  public productPictureGetAll(productId: string, sort: number){
    let productPictureParamDto = new ProductPictureSearchDto();
    productPictureParamDto.productId = productId;
    productPictureParamDto.sort = sort;
    this.productPictureService.productPictureSearchDtoSet(productPictureParamDto);
    this.subscription= this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
        if (res) {
          this.typeDto.products?.forEach(x => {
            if (x.id == res[0].productId) {
              if (res[0]) {
              }
              x.productPictures = res;
            }
          })
        }
      }
    )
  }
  scroll() {
    this.slider = this.key.nativeElement;
    if (this.slider.scrollWidth + this.slider.scrollLeft <= window.innerWidth+100) {
      this.pageIndex++;
      this.productGetAll(this.typeDto.id);
    }
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {ProductSearchDto} from "../../../shared/dto/product/productSearchDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {ProductService} from "../../../product/product-service/product.service";
import {ProductPictureService} from "../../../shared/Services/product-picture.service";
import {Subscription} from "rxjs";
import {TypeService} from "../../../type/type-service/type.service";
import {TypeSearchDto} from "../../../shared/dto/type/typeSearchDto";
import {environment} from "../../../../environments/environment";
import {ActiveType} from "../../../shared/enum/activeType";

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
  public productDtos:ProductDto[]=[];

  constructor(private productService: ProductService, private productPictureService: ProductPictureService, private typeService: TypeService,private el:ElementRef) {}
  ngOnInit(): void {
    this.checkChild();
   this.productGetAll(this.typeDto.id);
    this.changeBg();
    setTimeout(() => {
      this.btnClickLeft();
    }, 1000)
  }
  private changeBg():void {
    if (this.index % 2 == 0) {
      this.el.nativeElement.querySelector(".container-slider-card").classList.add('bg-black-a7')
    } else if (this.index % 2 == 1) {
      this.el.nativeElement.querySelector(".container-slider-card").classList.add('bg-brown-a3')
    }
  }
  public checkChild():void {
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
  public btnClickRight():void {
    this.slider = this.key.nativeElement;
    let scrollRight = setInterval(() => {
      this.slider.scrollLeft += 3;
    }, 1)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 600)
  }
  public btnClickLeft():void {
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
    productParamDto.pageSize =Number(environment.setting.product.addLoadNumber);
    productParamDto.pageIndex = this.pageIndex;
    productParamDto.typeId = typeId;
    productParamDto.isActive=ActiveType.active;
    this.productService.productSearchDtoSet(productParamDto);
    this.subscription = this.productService.productGetAll().subscribe((res: PaginationDto<ProductDto>) => {
      if (res) {
        res.data.forEach(x=>{
        this.productDtos.push(x);
        })
      }
    })
  }
  public scroll() :void {
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

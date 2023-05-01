import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Observable, Subscription} from "rxjs";
import {TypeService} from "../../type/type-service/type.service";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {TypeParamDto} from "../../shared/dto/type/typeParamDto";
import {ProductParamDto} from "../../shared/dto/product/productParamDto";
import {ProductService} from "../../product/product-service/product.service";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductPictureService} from "../../shared/Services/product-picture.service";
import {ProductPictureSearchDto} from "../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureDto} from "../../shared/dto/productPicture/productPictureDto";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(private title: Title, private typeService: TypeService, private productService: ProductService, private productPictureService: ProductPictureService) {
    this.title.setTitle("فروشگاه بزرگ کاکتوس")
  }

  public subscription: Subscription;
  public typesDto: TypeDto[];

  ngOnInit(): void {
    this.typeGetAll();
  }

  public typeGetAll() {
    let typeParamDto = new TypeParamDto();
    typeParamDto.parentTypeId = "00000000-0000-0000-0000-000000000000";
    this.typeService.typeSetParam(typeParamDto);
  this.subscription=  this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typesDto = res.data;
        this.typesDto?.forEach(x => {
          this.productGetAll(x.id)
        })
      }
    })
  }

  public productGetAll(typeId: string) {
    let productParamDto = new ProductParamDto();
    productParamDto.pageSize=5;
    productParamDto.typeId = typeId;
    this.productService.productSetParam(productParamDto);
    this.subscription=  this.productService.productGetAll().subscribe((res: PaginationDto<ProductDto>) => {
      if (res) {
        this.typesDto?.forEach(x => {
          if (x.id == typeId) {
            x.products = res.data;
            x.products?.forEach(x => {
              this.productPictureGetAll(x.id, 1)
            })
          }
        })
      }
    })
  }

  public productPictureGetAll(productId: string, sort: number) {
    let productPictureParamDto = new ProductPictureSearchDto();
    productPictureParamDto.productId = productId;
    productPictureParamDto.sort = sort;
    this.productPictureService.productPictureSearchDtoSet(productPictureParamDto);
    this.subscription=  this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
      if (res) {
        this.typesDto?.forEach(x => {
          x.products?.forEach(x => {
            if (x.id == res[0]?.productId) {
              if(res[0]){
              }
              x.productPictures = res;
            }
          })
        })
      }
    })
  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

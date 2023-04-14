import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TypeService} from "../type-service/type.service";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {TypeParamDto} from "../../shared/dto/type/typeParamDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {TypePictureService} from "../../shared/Services/type-picture.service";
import {TypePictureParamDto} from "../../shared/dto/typePicture/typePictureParamDto";
import {TypePictureDto} from "../../shared/dto/typePicture/typePictureDto";
import {ProductParamDto} from "../../shared/dto/product/productParamDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductPictureParamDto} from "../../shared/dto/productPicture/productPictureParamDto";
import {ProductPictureDto} from "../../shared/dto/productPicture/productPictureDto";
import {ProductPictureService} from "../../shared/Services/product-picture.service";
import {ProductService} from "../../product/product-service/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit, OnDestroy {
  public typeSlug: string;
  public typeDto: TypeDto;
  public typesDto: TypeDto[];
  public subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private typeService: TypeService, private typePictureService: TypePictureService, private productPictureService: ProductPictureService, private productService: ProductService, private router: Router) {
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }

  ngOnInit(): void {
    this.typeSlug = this.activatedRoute.snapshot.paramMap.get("TypeSlug");
    this.typeGet();
  }
  public typeGet() {
    let typeParamDto = new TypeParamDto();
    typeParamDto.slug = this.typeSlug;
    this.typeService.typeSetParam(typeParamDto);
    this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typeDto = res.data[0];
        this.typePicturesGet()
        this.typeGetAll();
      }
    })
  }

  public typePicturesGet() {
    let typePictureParamDto = new TypePictureParamDto();
    typePictureParamDto.typeId = this.typeDto.id;
    this.typePictureService.typePictureSetParam(typePictureParamDto);
    this.typePictureService.typePictureGetAll().subscribe((res: TypePictureDto[]) => {
      if (res) {
        this.typeDto.typePictures = res;
      }
    })
  }
  public typeGetAll() {
    let typeParamDto = new TypeParamDto();
    typeParamDto.justParentTypeId = this.typeDto.id;
    this.typeService.typeSetParam(typeParamDto);
    this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typesDto = res.data;
        this.typesDto.forEach(x => {
          this.productGetAll(x.id)
        })
      }
    })
  }
  public productGetAll(typeId: number) {
    let productParamDto = new ProductParamDto();
    productParamDto.typeId = typeId;
    this.productService.productSetParam(productParamDto);
    this.productService.productGetAll().subscribe((res: PaginationDto<ProductDto>) => {
      if (res) {
        this.typesDto.forEach(x => {
          if (x.id == typeId) {
            x.products = res.data;
            x.products.forEach(x => {
              this.productPictureGetAll(x.id, 1)
            })
          }
        })
      }
    })
  }
  public productPictureGetAll(productId: number, sort: number) {
    let productPictureParamDto = new ProductPictureParamDto();
    productPictureParamDto.productId = productId;
    productPictureParamDto.sort = sort;
    this.productPictureService.productPictureSetParam(productPictureParamDto);
    this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
      if (res) {
        this.typesDto?.forEach(x => {
          x.products?.forEach(x => {
            if (x.id == res[0].productId) {
              if (res[0]) {
              }
              x.productPictures = res;
            }
          })
        })
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

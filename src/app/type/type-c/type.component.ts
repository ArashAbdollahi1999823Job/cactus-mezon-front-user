import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TypeService} from "../type-service/type.service";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {TypeSearchDto} from "../../shared/dto/type/typeSearchDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {TypePictureService} from "../../shared/Services/type-picture.service";
import {TypePictureParamDto} from "../../shared/dto/typePicture/typePictureParamDto";
import {TypePictureDto} from "../../shared/dto/typePicture/typePictureDto";
import {ProductPictureService} from "../../shared/Services/product-picture.service";
import {ProductService} from "../../product/product-service/product.service";
import {Subscription} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnDestroy {
  public typeSlug: string;
  public typeDto: TypeDto;
  public typesDto: TypeDto[];
  public subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private typeService: TypeService, private typePictureService: TypePictureService,
              private productPictureService: ProductPictureService, private productService: ProductService, private router: Router,private meta:Meta,private title:Title) {
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.typeGet();
      }
    })
  }
  public typeGet():void {
    this.typeSlug = this.activatedRoute.snapshot.paramMap.get("TypeSlug");
    let typeParamDto = new TypeSearchDto();
    typeParamDto.slug = this.typeSlug;
    this.typeService.typeSearchDtoSet(typeParamDto);
    this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typeDto = res.data[0];
        this.meta.updateTag({ name: 'keywords', content: this.typeDto.metaDescription });
        this.meta.updateTag({ name: 'robots', content: "index,follow" });
        this.meta.updateTag( { name: 'description', content: this.typeDto.metaDescription } );
        this.title.setTitle(this.typeDto.name)
        this.typePicturesGet()
        this.typeGetAll();
      }
    })
  }
  public typePicturesGet():void {
    let typePictureParamDto = new TypePictureParamDto();
    typePictureParamDto.typeId = this.typeDto.id;
    this.typePictureService.typePictureSetParam(typePictureParamDto);
    this.typePictureService.typePictureGetAll().subscribe((res: TypePictureDto[]) => {
      if (res) {
        this.typeDto.typePictures = res;
      }
    })
  }
  public typeGetAll():void {
    let typeParamDto = new TypeSearchDto();
    typeParamDto.justParentTypeId = this.typeDto.id;
    this.typeService.typeSearchDtoSet(typeParamDto);
    this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typesDto = res.data;
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

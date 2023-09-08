import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ProductSearchDto} from "../../shared/dto/product/productSearchDto";
import {BrandDto} from "../../shared/dto/brand/brandDto";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {ProductService} from "../../product/product-service/product.service";
import {BrandService} from "../../shared/Services/brand.service";
import {BrandSearchDto} from "../../shared/dto/brand/brandSearchDto";
import {Subscription} from "rxjs";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {TypeService} from "../../type/type-service/type.service";
import {TypeSearchDto} from "../../shared/dto/type/typeSearchDto";
import {ProductDto} from "../../shared/dto/product/productDto";
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() productUpdate=new EventEmitter<boolean>();
  public productDtoPre:ProductDto[];
  public productSearchDto: ProductSearchDto;
  public typeDtoPre:TypeDto[];
  public brandDtos: BrandDto[];
  public typeDtos: TypeDto[];
  private subscription:Subscription;
  @ViewChild("search",{static:false}) searchTerm: ElementRef;
  sortOptions=[
    {key:1,title:'اسم'},
    {key:2,title:'قیمت'},
  ];
  sortTypeOptions=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];

  constructor(private ef: ElementRef, private productService: ProductService,private brandService:BrandService,private typeService:TypeService,private renderer2:Renderer2) {}
  ngOnInit(): void {
    this.productSearchDto = this.productService.productSearchDtoGet();
    this.brandGetAll();
    this.typeGetAll();
  }
  private brandGetAll():void {
    let brandSearchDto=new BrandSearchDto();
    this.brandService.brandSearchDtoSet(brandSearchDto);
    this.subscription= this.brandService.brandGetAll().subscribe((paginationBrandDtoRes:PaginationDto<BrandDto>) => {
      this.brandDtos = paginationBrandDtoRes.data;
    });
  }
  private typeGetAll():void {
    let typeSearchDto=new TypeSearchDto();
    typeSearchDto.pageSize=100;
    this.typeService.typeSearchDtoSet(typeSearchDto);
    this.subscription= this.typeService.typeGetAll().subscribe((paginationTypeDtoRes:PaginationDto<TypeDto>) => {
      this.typeDtos = paginationTypeDtoRes.data;
    });
  }
  public onChangeType(typeId: any):void {

    this.productSearchDto.typeId=typeId;
    this.productSearchDto.pageIndex=1;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  public onChangeBrand(brandId: any):void {
    this.productSearchDto.brandId=brandId;
    this.productSearchDto.pageIndex=1;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);

  }
/*  public onChangeSort(sort: any):void {
    this.productSearchDto.sortType=sort;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  public onChangeTypeSort(sortType: any):void {
    this.productSearchDto.sortType=sortType;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }*/
  changeSearch() {
    this.productSearchDto.name=this.searchTerm?.nativeElement?.value;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }

  changeSearchGetType():void {
    let typeSearchDto=new TypeSearchDto();
    typeSearchDto.pageSize=100;
    typeSearchDto.name=this.searchTerm?.nativeElement?.value;
    this.typeService.typeSearchDtoSet(typeSearchDto);
    this.subscription= this.typeService.typeGetAll().subscribe((paginationTypeDtoRes:PaginationDto<TypeDto>) => {
      let data = paginationTypeDtoRes.data;
      if (data.length <= 5) {
        data=   paginationTypeDtoRes.data;
      } else {
      data= paginationTypeDtoRes.data.slice(0,4);
      }
      this.typeDtoPre = data;
    });
  }
  changeSearchGetProduct():void {
    let productSearchDto=new ProductSearchDto();
    productSearchDto.pageSize=100;
    productSearchDto.name=this.searchTerm?.nativeElement?.value;
    this.productService.productSearchDtoSet(productSearchDto);
    this.subscription= this.productService.productGetAll().subscribe((paginationProductDtoRes:PaginationDto<ProductDto>) => {
      let data = paginationProductDtoRes.data;
      if (data.length <= 5) {
        data=   paginationProductDtoRes.data;
      } else {
        data= paginationProductDtoRes.data.slice(0,4);
      }
      this.productDtoPre = data;
    });
  }

  showPre() {
  var preEl=  this.ef.nativeElement.getElementsByClassName("pre")[0];
  preEl.classList.add("visible");
  preEl.classList.remove("hidden");
  }
  dontShowPre() {
    var preEl=  this.ef.nativeElement.getElementsByClassName("pre")[0];
    setTimeout(()=>
    {
      preEl.classList.add("hidden");
      preEl.classList.remove("visible");
    },300)
  }

  clickProductPre(name: string) {
    this.renderer2.setProperty(this.searchTerm.nativeElement,'value',name);
    this.productSearchDto.name=name;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
}

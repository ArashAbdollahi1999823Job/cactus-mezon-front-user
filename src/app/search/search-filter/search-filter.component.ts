import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() productUpdate=new EventEmitter<boolean>();
  public productSearchDto: ProductSearchDto;
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

  constructor(private ef: ElementRef, private productService: ProductService,private brandService:BrandService,private typeService:TypeService) {}
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
    this.typeService.typeSearchDtoSet(typeSearchDto);
    this.subscription= this.typeService.typeGetAll().subscribe((paginationTypeDtoRes:PaginationDto<TypeDto>) => {
      this.typeDtos = paginationTypeDtoRes.data;
    });
  }
  public onChangeType(typeId: any):void {
    this.productSearchDto.typeId=typeId;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  public onChangeBrand(brandId: any):void {
    this.productSearchDto.brandId=brandId;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  public onChangeSort(sort: any):void {
    this.productSearchDto.sortType=sort;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  public onChangeTypeSort(sortType: any):void {
    this.productSearchDto.sortType=sortType;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
  changeSearch() {
    this.productSearchDto.name=this.searchTerm?.nativeElement?.value;
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
}

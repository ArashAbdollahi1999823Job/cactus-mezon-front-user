import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductService} from "../../product/product-service/product.service";
import {ProductSearchDto} from "../../shared/dto/product/productSearchDto";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-search-c',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit ,OnDestroy{
  public paginationProductDto: PaginationDto<ProductDto> ;
  private subscription:Subscription;
  public productSearchDto;
  constructor(private title:Title,private  productService:ProductService) {    this.title.setTitle("جستجو در فروشگاه کاکتوس")}
  ngOnInit(): void {
    this.productSearchDto=new ProductSearchDto();
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productGetAll();
  }
  public productUpdate(updated: boolean):void {
    if (updated) this.productGetAll()
  }
  private productGetAll():void {
   this.subscription= this.productService.productGetAll().subscribe((paginationProductDtoRes:PaginationDto<ProductDto>) => {
      this.paginationProductDto = paginationProductDtoRes;
    });
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

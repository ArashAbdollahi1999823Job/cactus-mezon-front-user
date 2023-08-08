import {Component, OnDestroy, OnInit} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductService} from "../../product/product-service/product.service";
import {ProductSearchDto} from "../../shared/dto/product/productSearchDto";
import {Subscription} from "rxjs";
import {ActiveType} from "../../shared/enum/activeType";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-search-c',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit ,OnDestroy{
  public paginationProductDto: PaginationDto<ProductDto> ;
  private subscription:Subscription;
  public productSearchDto;
  constructor(private title:Title,private  productService:ProductService,private meta:Meta) {  }
  ngOnInit(): void {
    this.productSearchDto=new ProductSearchDto();
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productGetAll();
    this.meta.updateTag({ name: 'keywords', content: environment.seo.search.keywords });
    this.meta.updateTag({ name: 'robots', content: "index,follow" });
    this.meta.updateTag( { name: 'description', content: environment.seo.search.description } );
    this.title.setTitle(environment.seo.search.title)
  }
  public productUpdate(updated: boolean):void {
    if (updated) this.productGetAll()
  }
  private productGetAll():void {
    this.productService.productSearchDto.isActive=ActiveType.active;
   this.subscription= this.productService.productGetAll().subscribe((paginationProductDtoRes:PaginationDto<ProductDto>) => {
      this.paginationProductDto = paginationProductDtoRes;
    });
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ProductSearchDto} from "../../../shared/dto/product/productSearchDto";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  public productSlug:string;
  public productDto:ProductDto;
constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private meta:Meta,private title:Title) {
}

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: "index,follow" });
    this.productSlug= this.activatedRoute.snapshot.paramMap.get('ProductSlug')
    this.productGet();
  }

  private productGet() {
    let productParamDto=new ProductSearchDto();
    productParamDto.slug=this.productSlug;
    this.productService.productSearchDtoSet(productParamDto);
    this.productService.productGetAll().subscribe((res)=>{
      this.productDto=res.data[0];
      this.meta.updateTag({ name: 'keywords', content: this.productDto.metaDescription });
      this.meta.updateTag( { name: 'description', content: this.productDto.metaDescription } );
      this.title.setTitle(this.productDto.name)
    })
  }
}

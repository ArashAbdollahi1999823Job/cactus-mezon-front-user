import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {ProductParamDto} from "../../../shared/dto/product/productParamDto";
import {ProductDto} from "../../../shared/dto/product/productDto";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  public productSlug:string;
  public productDto:ProductDto;
constructor(private productService:ProductService,private activatedRoute:ActivatedRoute) {
}

  ngOnInit(): void {
    this.productSlug= this.activatedRoute.snapshot.paramMap.get('ProductSlug')
    this.productGet();
  }

  private productGet() {
    let productParamDto=new ProductParamDto();
    productParamDto.slug=this.productSlug;
    this.productService.productSetParam(productParamDto);
    this.productService.productGetAll().subscribe((res)=>{
      this.productDto=res.data[0];
    })
  }
}

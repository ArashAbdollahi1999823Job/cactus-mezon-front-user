import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../Services/product.service";
import {ActivatedRoute} from "@angular/router";
import {IProductDto} from "../../dtos/product/IProductDto";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})


export class ProductDetailsComponent implements OnInit {
  slug: string | null | undefined;
  product:IProductDto|undefined;
  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,private title:Title) {

  }
  ngOnInit(): void {
    this.slug = this.activeRoute.snapshot.paramMap.get('slug');
    // @ts-ignore
    this.getProductBySlug(this.slug)
  }
  getProductBySlug(slug: string) {
    return this.productService.getProductBySlug(slug).subscribe((res) => {
      this.product=res;
      this.title.setTitle(res.title+" در فروشگاه کاکتوس ")
    })
  }
}

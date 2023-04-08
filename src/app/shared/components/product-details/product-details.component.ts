import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../product/product-service/product.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})


export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute,private title:Title) {

  }
  ngOnInit(): void {

  }

}

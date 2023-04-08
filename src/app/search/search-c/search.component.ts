import {Component, OnInit} from '@angular/core';
import {SearchService} from "../services/search.service";
import {IPaginationResponseDto} from "../../shared/dto/IPaginationResponseDto";
import {IProductDto} from "../../shared/dto/product/IProductDto";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-search-c',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public products: IPaginationResponseDto<IProductDto> | undefined;
  constructor(private searchService: SearchService,private title:Title) {
    this.title.setTitle("جستجو در فروشگاه کاکتوس")
  }

  ngOnInit(): void {
    this.getProducts();
  }

  updateProduct(updated: boolean) {
    if (updated) this.getProducts()
  }

  private getProducts() {
    this.searchService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }


}

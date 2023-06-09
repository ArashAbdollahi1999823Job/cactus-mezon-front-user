import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductService} from "../../product/product-service/product.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Output() productUpdate = new EventEmitter<boolean>();

  @Input("paginationProductDto") paginationProductDto: PaginationDto<ProductDto>;
  @ViewChild('key') key: ElementRef;
  slider: Element;

  public showDetails(event: any): void {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "30%";
    cardDetails.style.width = "60px";
    cardDetails.style.borderRight = "1px solid black";
    detailsButton.forEach(x => {
      x.style.fontSize = '1.7vh';
    })
  }

  public hideDetails(event: any): void {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width = "0";
    detailsButton.forEach(x => {
      x.style.fontSize = '1vh';
    })
    cardDetails.style.width = "15px";
    cardDetails.style.borderRight = "0px solid black";
  }

  public pageIndex = 1;

  constructor(private productService: ProductService) {
  }

  public scroll() {
    this.slider = this.key.nativeElement;
    if (this.slider.scrollTop > this.slider.scrollHeight -800) {
      let productSearchDto = this.productService.productSearchDtoGet();
      this.pageIndex++;
      productSearchDto.pageIndex = this.pageIndex;
      this.productService.productSearchDtoSet(productSearchDto);
      this.productService.productGetAll().subscribe((res) => {
        this.pageIndex=res.pageIndex;
        res.data.forEach(x => {
          this.paginationProductDto.data.push(x);
        })
      })
    }
  }
}

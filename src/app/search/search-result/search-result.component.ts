import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {ProductService} from "../../product/product-service/product.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements AfterViewInit{
  @Output() productUpdate = new EventEmitter<boolean>();

  @Input("paginationProductDto") paginationProductDto: PaginationDto<ProductDto>;
  @ViewChild('key') key: ElementRef;
  slider: Element;
  public pageIndex = 1;

  constructor(private productService: ProductService,private renderer: Renderer2,private ef:ElementRef) {
  }


  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.container'), 'height', window.innerHeight-100-70+ "px");
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

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProductSearchDto} from "../../shared/dto/product/productSearchDto";
import {ProductService} from "../../product/product-service/product.service";
@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.scss']
})
export class SearchPaginationComponent implements OnChanges, OnInit {
  @Output() productUpdate = new EventEmitter<boolean>();
  public productSearchDto: ProductSearchDto;
  @Input() size: number
  @Input() index: number;
  @Input() count: number;
  countItems: number[];
  constructor(private productService: ProductService) {
  }
  ngOnInit(): void {
    this.productSearchDto = this.productService.productSearchDtoGet();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.countItems = Array.from({length: Math.ceil((Number(this.count) / Number(this.size)))}, (v, k) => k + 1);
  }
  public changeIndex($event: any): void {
    this.productSearchDto.pageIndex = Number($event.srcElement.id);
    this.productService.productSearchDtoSet(this.productSearchDto);
    this.productUpdate.emit(true);
  }
}

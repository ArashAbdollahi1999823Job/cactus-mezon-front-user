import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RequestShopParamsDto} from "../../shared/dto/RequestShopParamsDto";
import {SearchService} from "../services/search.service";
@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.scss']
})

export class SearchPaginationComponent implements OnChanges,OnInit {
  @Output() UpdateProduct=new EventEmitter<boolean>();
  public filterProductParams: RequestShopParamsDto | undefined;
  @Input() size: number | undefined;
  @Input() index: number | undefined;
  @Input() count: number | undefined;
  countItems: number[] | undefined;

  constructor(private searchService: SearchService) {  }
  ngOnInit() {
    this.filterProductParams = this.searchService.getParams();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    // @ts-ignore
    this.filterProductParams.pageIndex=Number($event.srcElement.id);
    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);

  }
}

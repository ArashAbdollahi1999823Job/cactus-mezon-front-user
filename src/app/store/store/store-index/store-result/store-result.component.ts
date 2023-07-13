import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {StoreDto} from "../../../../shared/dto/store/storeDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {StoreService} from "../../../store-service/store.service";

@Component({
  selector: 'store-result',
  templateUrl: './store-result.component.html',
  styleUrls: ['./store-result.component.scss']
})
export class StoreResultComponent implements AfterViewInit{
  @Output() storeUpdate = new EventEmitter<boolean>();
  @Input("paginationStoreDto") paginationStoreDto: PaginationDto<StoreDto>;
  @ViewChild('key') key: ElementRef;
  slider: Element;
  public pageIndex = 1;
  constructor(private storeService: StoreService,private renderer: Renderer2,private ef:ElementRef) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.container'), 'height', window.innerHeight-110+ "px");
  }
  public scroll() {
    this.slider = this.key.nativeElement;
    if (this.slider.scrollTop > this.slider.scrollHeight -800) {
      let storeSearchDto = this.storeService.storeSearchDtoGet();
      this.pageIndex++;
      storeSearchDto.pageIndex = this.pageIndex;
      this.storeService.storeSearchDtoSet(storeSearchDto);
      this.storeService.storeGetAll().subscribe((res) => {
        this.pageIndex=res.pageIndex;
        res.data.forEach(x => {
          this.paginationStoreDto.data.push(x);
        })
      })
    }
  }
}

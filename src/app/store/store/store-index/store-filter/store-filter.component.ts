import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {StoreSearchDto} from "../../../../shared/dto/store/storeSearchDto";
import {Subscription} from "rxjs";
import {StoreService} from "../../../store-service/store.service";
@Component({
  selector: 'store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.scss']
})
export class StoreFilterComponent implements OnInit {
  @Output() storeUpdate=new EventEmitter<boolean>();
  public storeSearchDto: StoreSearchDto;
  private subscription:Subscription;
  @ViewChild("search",{static:false}) searchTerm: ElementRef;

  constructor(private ef: ElementRef,private storeService:StoreService) {}
  ngOnInit(): void {
    this.storeSearchDto = this.storeService.storeSearchDtoGet();
  }
  changeSearch() {
    this.storeSearchDto.name=this.searchTerm?.nativeElement?.value;
    this.storeService.storeSearchDtoSet(this.storeSearchDto);
    this.storeUpdate.emit(true);
  }
}

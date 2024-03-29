import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs";
import {Meta, Title} from "@angular/platform-browser";
import {StoreDto} from "../../../../shared/dto/store/storeDto";
import {StoreService} from "../../../store-service/store.service";
import {StoreSearchDto} from "../../../../shared/dto/store/storeSearchDto";
import {ActiveType} from "../../../../shared/enum/activeType";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-store-index',
  templateUrl: './store-index.component.html',
  styleUrls: ['./store-index.component.scss']
})
export class StoreIndexComponent implements OnInit ,OnDestroy{
  public paginationStoreDto: PaginationDto<StoreDto> ;
  private subscription:Subscription;
  public storeSearchDto:StoreSearchDto;
  constructor(private title:Title,private  storeService:StoreService,private meta:Meta) { }
  ngOnInit(): void {
    this.storeSearchDto=new StoreSearchDto();
    this.storeService.storeSearchDtoSet(this.storeSearchDto);
    this.storeGetAll();
    this.meta.updateTag({ name: 'keywords', content: environment.seo.store.keywords });
    this.meta.updateTag({ name: 'robots', content: "index,follow" });
    this.meta.updateTag( { name: 'description', content: environment.seo.store.description } );
    this.title.setTitle(environment.seo.store.title)
  }
  public storeUpdate(updated: boolean):void {
    if (updated) this.storeGetAll()
  }
  private storeGetAll():void {
    let storeSearchDto=new StoreSearchDto();
    storeSearchDto.activeType=ActiveType.active;
    this.storeService.storeSearchDtoSet(storeSearchDto);
    this.subscription= this.storeService.storeGetAll().subscribe((paginationStoreDtoRes:PaginationDto<StoreDto>) => {
      this.paginationStoreDto = paginationStoreDtoRes;
    });
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

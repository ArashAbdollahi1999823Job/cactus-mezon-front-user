import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../../store-service/store.service";
import {StoreDto} from "../../../../shared/dto/store/storeDto";
import {StoreUserPictureDto} from "../../../../shared/dto/storePicture/storeUserPictureDto";
import {Subscription} from "rxjs";
import {StoreSearchDto} from "../../../../shared/dto/store/storeSearchDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {StorePictureSearchDto} from "../../../../shared/dto/storePicture/storePictureSearchDto";
import {environment} from "../../../../../environments/environment";
import {StorePictureService} from "../../../store-service/store-picture.service";
@Component({
  selector: 'store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit,AfterViewInit{
  public storeSlug:string;
  public storeDto:StoreDto;
  public storePictureDtos:StoreUserPictureDto[];
  private subscription:Subscription;
  constructor(private activatedRoute:ActivatedRoute,private storeService:StoreService,private storePictureService:StorePictureService,private renderer: Renderer2,private ef:ElementRef) {
  }
  ngOnInit(): void {
    this.storeSlug= this.activatedRoute.snapshot.paramMap.get('StoreSlug');
    this.storeGet();
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-70+ "px");
  }

 public storeGet():void{
    let storeSearchDto=new StoreSearchDto();
    storeSearchDto.slug=this.storeSlug;
    this.storeService.storeSearchDtoSet(storeSearchDto);
    this.subscription=this.storeService.storeGetAll().subscribe((paginationStoreDtoRes:PaginationDto<StoreDto>)=>{
      if (paginationStoreDtoRes)this.storeDto=paginationStoreDtoRes.data[0];
      this.storePictureGet();
    })
  }

  public storePictureGet(){
    let storePictureSearchDto=new StorePictureSearchDto();
    storePictureSearchDto.storeId=this.storeDto.id;
    storePictureSearchDto.startRange=environment.role.store.sliderStart;
    storePictureSearchDto.endRange=environment.role.store.sliderEnd;
    this.storePictureService.storePictureSearchDtoSet(storePictureSearchDto);
    this.subscription=this.storePictureService.storePictureGetAll().subscribe((storePictureDtoRes:StoreUserPictureDto[])=>{
      if(storePictureDtoRes)this.storePictureDtos=storePictureDtoRes;
    })
  }

}

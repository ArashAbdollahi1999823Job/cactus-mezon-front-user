import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {TypeService} from "../../type/type-service/type.service";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {TypeSearchDto} from "../../shared/dto/type/typeSearchDto";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  constructor(private title: Title, private typeService: TypeService) {
    this.title.setTitle("فروشگاه بزرگ کاکتوس")
  }

  public subscription: Subscription;
  public typeDtos: TypeDto[];

  ngOnInit(): void {
    this.typeGetAll();
  }

  public typeGetAll(): void {
    let typeParamDto = new TypeSearchDto();
    typeParamDto.parentTypeId = environment.setting.type.typeMatherIndex;
    this.typeService.typeSearchDtoSet(typeParamDto);
    this.subscription = this.typeService.typeGetAll().subscribe((res: PaginationDto<TypeDto>) => {
      if (res) {
        this.typeDtos = res.data;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

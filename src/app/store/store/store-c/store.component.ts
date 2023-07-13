import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {StoreDto} from "../../../shared/dto/store/storeDto";
import {StoreService} from "../../store-service/store.service";
import {StoreSearchDto} from "../../../shared/dto/store/storeSearchDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent{
}

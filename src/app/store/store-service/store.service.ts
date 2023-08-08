import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {StoreSearchDto} from "../../shared/dto/store/storeSearchDto";
import {StoreDto} from "../../shared/dto/store/storeDto";
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public storeSearchDto :StoreSearchDto;
  public constructor(private http: HttpClient) {}
  public storeSearchDtoGet() {
    return this.storeSearchDto;
  }
  public storeSearchDtoSet(storeSearchDto: StoreSearchDto) {
    this.storeSearchDto = storeSearchDto;
  }
  public storeGetAll(): Observable<PaginationDto<StoreDto>> {
    let storeParam = this.generateStoreParam();
    return this.http.get<PaginationDto< StoreDto>>(`${this.backendUrlUser}/StoreUser/StoreGetAll`, {params: storeParam});
  }
  private generateStoreParam() {
    let requestStoreParam = new HttpParams();
    if (this.storeSearchDto.mobileNumber) requestStoreParam = requestStoreParam.append("mobileNumber", this.storeSearchDto.mobileNumber);
    if (this.storeSearchDto.phoneNumber) requestStoreParam = requestStoreParam.append("phoneNumber", this.storeSearchDto.phoneNumber);
    if (this.storeSearchDto.name) requestStoreParam = requestStoreParam.append("name", this.storeSearchDto.name);
    if (this.storeSearchDto.slug) requestStoreParam = requestStoreParam.append("slug", this.storeSearchDto.slug);
    if (this.storeSearchDto.userId) requestStoreParam = requestStoreParam.append("userId", this.storeSearchDto.userId);
    if (this.storeSearchDto.id) requestStoreParam=requestStoreParam.append('id',this.storeSearchDto.id);
    requestStoreParam = requestStoreParam.append('pageIndex', this.storeSearchDto.pageIndex);
    requestStoreParam = requestStoreParam.append('pageSize', this.storeSearchDto.pageSize);
    requestStoreParam = requestStoreParam.append('activeType', this.storeSearchDto.activeType);
    requestStoreParam=requestStoreParam.append('sortType',this.storeSearchDto.sortType);
    requestStoreParam=requestStoreParam.append('minutesCache',environment.cache.store.store)
    return requestStoreParam;
  }
}

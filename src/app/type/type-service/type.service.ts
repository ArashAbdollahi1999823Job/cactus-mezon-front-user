import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {TypeSearchDto} from "../../shared/dto/type/typeSearchDto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public typeSearchDto :TypeSearchDto;
  public constructor(private http: HttpClient) {}
  public typeSearchDtoGet() {
    return this.typeSearchDto;
  }
  public typeSearchDtoSet(typeSearchDto: TypeSearchDto) {
    this.typeSearchDto = typeSearchDto;
  }
  public typeGetAll(): Observable<PaginationDto<TypeDto>> {
    let productTypeParam = this.generateTypeParam();
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlUser}/TypeUser/TypeGetAll`, {params: productTypeParam});
  }
  private generateTypeParam() {
    let requestTypeParam = new HttpParams();
    if (this.typeSearchDto.name) requestTypeParam = requestTypeParam.append("name", this.typeSearchDto.name);
    if (this.typeSearchDto.slug) requestTypeParam = requestTypeParam.append("slug", this.typeSearchDto.slug);
    if (this.typeSearchDto.parentTypeId) requestTypeParam = requestTypeParam.append("parentTypeId", this.typeSearchDto.parentTypeId);
    if (this.typeSearchDto.parentTypeId) requestTypeParam = requestTypeParam.append("parentTypeId", this.typeSearchDto.parentTypeId);
    if (this.typeSearchDto.justParentTypeId) requestTypeParam = requestTypeParam.append("justParentTypeId", this.typeSearchDto.justParentTypeId);
    if (this.typeSearchDto.id) requestTypeParam=requestTypeParam.append('id',this.typeSearchDto.id);
    requestTypeParam = requestTypeParam.append('pageIndex', this.typeSearchDto.pageIndex);
    requestTypeParam = requestTypeParam.append('pageSize', this.typeSearchDto.pageSize);
    requestTypeParam = requestTypeParam.append('isActive', this.typeSearchDto.activeType);
    requestTypeParam=requestTypeParam.append('sortType',this.typeSearchDto.sortType);
    return requestTypeParam;
  }
}

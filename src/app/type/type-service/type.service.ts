import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {TypeParamDto} from "../../shared/dto/type/typeParamDto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeDto} from "../../shared/dto/type/typeDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private backendUrlUser = environment.backendUrlUser;
  public typeParamDto = new TypeParamDto();
  public constructor(private http: HttpClient) {}
  public typeGetParam() {
    return this.typeParamDto;
  }
  public typeSetParam(typeParamDto: TypeParamDto) {
    this.typeParamDto = typeParamDto;
  }
  public typeGetAll(): Observable<PaginationDto<TypeDto>> {
    let productTypeParam = this.generateTypeParam();
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlUser}/TypeUser/TypeGetAll`, {params: productTypeParam});
  }
  private generateTypeParam() {
    let requestTypeParam = new HttpParams();
    if (this.typeParamDto.name) requestTypeParam = requestTypeParam.append("name", this.typeParamDto.name);
    if (this.typeParamDto.slug) requestTypeParam = requestTypeParam.append("slug", this.typeParamDto.slug);
    if (this.typeParamDto.parentTypeId) requestTypeParam = requestTypeParam.append("parentTypeId", this.typeParamDto.parentTypeId);
    if (this.typeParamDto.parentTypeId) requestTypeParam = requestTypeParam.append("parentTypeId", this.typeParamDto.parentTypeId);
    if (this.typeParamDto.justParentTypeId) requestTypeParam = requestTypeParam.append("justParentTypeId", this.typeParamDto.justParentTypeId);
    if (this.typeParamDto.id) requestTypeParam=requestTypeParam.append('id',this.typeParamDto.id);
    requestTypeParam = requestTypeParam.append('pageIndex', this.typeParamDto.pageIndex);
    requestTypeParam = requestTypeParam.append('pageSize', this.typeParamDto.pageSize);
    requestTypeParam = requestTypeParam.append('isActive', this.typeParamDto.activeType);
    requestTypeParam=requestTypeParam.append('sortType',this.typeParamDto.sortType);
    return requestTypeParam;
  }
}

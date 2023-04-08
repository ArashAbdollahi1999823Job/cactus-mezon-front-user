import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ProductParamDto} from "../../shared/dto/product/productParamDto";
import {Observable} from "rxjs";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private backendUrlUser = environment.backendUrlUser;
  public productParamDto : ProductParamDto;


  public productGetParam() {
    return this.productParamDto;
  }
  public productSetParam(productParamDto: ProductParamDto) {
    this.productParamDto = productParamDto;
  }
  public productGetAll(): Observable<PaginationDto<ProductDto>> {
    let productParam = this.generateProductParam();
    return this.http.get<PaginationDto<ProductDto>>(`${this.backendUrlUser}/ProductUser/ProductGetAll`, {params: productParam});
  }
  private generateProductParam() {
    let requestProductParam = new HttpParams();
    if (this.productParamDto.id) requestProductParam=requestProductParam.append('id',this.productParamDto.id);
    requestProductParam = requestProductParam.append('isActive', this.productParamDto.isActive);
    if (this.productParamDto.name) requestProductParam = requestProductParam.append("name", this.productParamDto.name);
    if (this.productParamDto.slug) requestProductParam = requestProductParam.append("slug", this.productParamDto.slug);
    if (this.productParamDto.price) requestProductParam = requestProductParam.append("price", this.productParamDto.price);
    if (this.productParamDto.typeId) requestProductParam = requestProductParam.append("typeId", this.productParamDto.typeId);
    if (this.productParamDto.inventoryId) requestProductParam = requestProductParam.append("inventoryId", this.productParamDto.inventoryId);
    if (this.productParamDto.brandId) requestProductParam = requestProductParam.append("brandId", this.productParamDto.brandId);
    if (this.productParamDto.storeId) requestProductParam = requestProductParam.append("storeId", this.productParamDto.storeId);
    if (this.productParamDto.off) requestProductParam = requestProductParam.append("off", this.productParamDto.off);
    requestProductParam = requestProductParam.append('pageIndex', this.productParamDto.pageIndex);
    requestProductParam = requestProductParam.append('pageSize', this.productParamDto.pageSize);
    requestProductParam=requestProductParam.append('sortType',this.productParamDto.sortType);
    return requestProductParam;
  }

}

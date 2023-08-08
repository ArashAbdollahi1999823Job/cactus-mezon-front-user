import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProductSearchDto} from "../../shared/dto/product/productSearchDto";
import {Observable} from "rxjs";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {ProductDto} from "../../shared/dto/product/productDto";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public productSearchDto : ProductSearchDto;
  public productSearchDtoGet() {
    return this.productSearchDto;
  }
  public productSearchDtoSet(productParamDto: ProductSearchDto) {
    this.productSearchDto = productParamDto;
  }
  public productGetAll(): Observable<PaginationDto<ProductDto>> {
    let productParam = this.generateProductParam();
    return this.http.get<PaginationDto<ProductDto>>(`${this.backendUrlUser}/ProductUser/ProductGetAll`, {params: productParam});
  }
  private generateProductParam() {
    let requestProductParam = new HttpParams();
    if (this.productSearchDto.id) requestProductParam=requestProductParam.append('id',this.productSearchDto.id);
    requestProductParam = requestProductParam.append('isActive', this.productSearchDto.isActive);
    if (this.productSearchDto.name) requestProductParam = requestProductParam.append("name", this.productSearchDto.name);
    if (this.productSearchDto.slug) requestProductParam = requestProductParam.append("slug", this.productSearchDto.slug);
    if (this.productSearchDto.price) requestProductParam = requestProductParam.append("price", this.productSearchDto.price);
    if (this.productSearchDto.typeId) requestProductParam = requestProductParam.append("typeId", this.productSearchDto.typeId);
    if (this.productSearchDto.inventoryId) requestProductParam = requestProductParam.append("inventoryId", this.productSearchDto.inventoryId);
    if (this.productSearchDto.brandId) requestProductParam = requestProductParam.append("brandId", this.productSearchDto.brandId);
    if (this.productSearchDto.storeId) requestProductParam = requestProductParam.append("storeId", this.productSearchDto.storeId);
    if (this.productSearchDto.off) requestProductParam = requestProductParam.append("off", this.productSearchDto.off);
    requestProductParam = requestProductParam.append('pageIndex', this.productSearchDto.pageIndex);
    requestProductParam = requestProductParam.append('pageSize', this.productSearchDto.pageSize);
    requestProductParam=requestProductParam.append('sortType',this.productSearchDto.sortType);
    requestProductParam=requestProductParam.append('user',this.productSearchDto.user)
    requestProductParam=requestProductParam.append('minutesCache',environment.cache.product.product)
    return requestProductParam;
  }

}

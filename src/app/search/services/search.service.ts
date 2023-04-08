import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {RequestShopParamsDto} from "../../shared/dto/RequestShopParamsDto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IPaginationResponseDto} from "../../shared/dto/IPaginationResponseDto";
import {IProductDto} from "../../shared/dto/product/IProductDto";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})



export class SearchService {
  private backendUrl = environment.backendUrl;
  private shopParams = new RequestShopParamsDto();

  constructor(private http: HttpClient) { }



  getParams(){
    return this.shopParams;
  }
  setParams(params:RequestShopParamsDto){
    this.shopParams=params;
  }
  getProducts():Observable<IPaginationResponseDto<IProductDto>>{
    let requestParams = this.generateRequestParams();
    return this.http.get<IPaginationResponseDto<IProductDto>>(this.backendUrl+"/product",{params:requestParams});
  }
  getBrands(){
    return this.http.get<any>(this.backendUrl+"/productBrand")
  }
  getTypes(){
    return this.http.get<any>(this.backendUrl+"/productType")
  }

  private generateRequestParams() {
    let requestParams = new HttpParams();
    if (this.shopParams.search) requestParams = requestParams.append("search", this.shopParams.search);
    if (this.shopParams.brandId && this.shopParams.brandId > 0) requestParams = requestParams.append('brandId', this.shopParams.brandId);
    if (this.shopParams.typeId && this.shopParams.typeId > 0) requestParams = requestParams.append('typeId', this.shopParams.typeId);
    requestParams = requestParams.append('pageIndex', this.shopParams.pageIndex);
    requestParams = requestParams.append('pageSize', this.shopParams.pageSize);
    requestParams = requestParams.append('sort', this.shopParams.sort);
    requestParams = requestParams.append('sortType', this.shopParams.sortType);
    return requestParams;
  }
}

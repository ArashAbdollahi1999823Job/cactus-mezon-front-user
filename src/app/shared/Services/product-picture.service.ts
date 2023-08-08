import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ProductPictureSearchDto} from "../dto/productPicture/productPictureSearchDto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductPictureDto} from "../dto/productPicture/productPictureDto";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ProductPictureService {
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public productPictureParam :ProductPictureSearchDto;
  public constructor(private http: HttpClient) {}
  public productPictureSearchDtoSet(productPictureParam: ProductPictureSearchDto) {
    this.productPictureParam = productPictureParam;
  }
  public productPictureGetAll(): Observable<ProductPictureDto[]> {
    let productPictureParam = new HttpParams();
    if (this.productPictureParam.productId) productPictureParam = productPictureParam.append("productId", this.productPictureParam.productId);
    if (this.productPictureParam.id) productPictureParam=productPictureParam.append('id',this.productPictureParam.id);
    if (this.productPictureParam.sort) productPictureParam=productPictureParam.append('sort',this.productPictureParam.sort);
    if (this.productPictureParam.startRange) productPictureParam=productPictureParam.append('startRange',this.productPictureParam.startRange);
    if (this.productPictureParam.endRange) productPictureParam=productPictureParam.append('endRange',this.productPictureParam.endRange);
    productPictureParam=productPictureParam.append('minutesCache',environment.cache.product.productPicture)
    return this.http.get<ProductPictureDto[]>(`${this.backendUrlUser}/ProductPictureUser/ProductPictureGetAll`, {params: productPictureParam});
  }
}

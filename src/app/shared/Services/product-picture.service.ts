import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {ProductPictureParamDto} from "../dto/productPicture/productPictureParamDto";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductPictureDto} from "../dto/productPicture/productPictureDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductPictureService {
  private backendUrlUser = environment.backendUrlUser;
  public productPictureParam :ProductPictureParamDto;
  public constructor(private http: HttpClient) {}

  public productPictureGetParam() {
    return this.productPictureParam;
  }
  public productPictureSetParam(productPictureParam: ProductPictureParamDto) {
    this.productPictureParam = productPictureParam;
  }
  public productPictureGetAll(): Observable<ProductPictureDto[]> {
    let productPictureParam = new HttpParams();
    if (this.productPictureParam.productId) productPictureParam = productPictureParam.append("productId", this.productPictureParam.productId);
    if (this.productPictureParam.id) productPictureParam=productPictureParam.append('id',this.productPictureParam.id);
    if (this.productPictureParam.sort) productPictureParam=productPictureParam.append('sort',this.productPictureParam.sort);
    return this.http.get<ProductPictureDto[]>(`${this.backendUrlUser}/ProductPictureUser/ProductPictureGetAll`, {params: productPictureParam});
  }
}

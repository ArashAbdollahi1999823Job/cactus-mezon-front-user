import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProductDto} from "../dtos/IProductDto";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getProductBySlug(slug:string):Observable<IProductDto>{
    return this.http.get<IProductDto>(`${this.backendUrl}product/${slug}`);
  }

}

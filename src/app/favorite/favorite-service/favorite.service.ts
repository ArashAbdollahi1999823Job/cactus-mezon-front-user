import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FavoriteAddDto} from "../../shared/dto/favorite/favoriteAddDto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.prod";
import {FavoriteSearchDto} from "../../shared/dto/favorite/favoriteSearchDto";
import {ProductDto} from "../../shared/dto/product/productDto";
import {FavoriteDeleteDto} from "../../shared/dto/favorite/favoriteDeleteDto";
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private backendUrlUser = environment.backendUrlUser;
  public favoriteSearchDto:FavoriteSearchDto;
  constructor(private http:HttpClient) { }
  public favoriteAdd(favoriteAddDto:FavoriteAddDto):Observable<boolean>{
    return this.http.post<boolean>(`${this.backendUrlUser}/FavoriteUser/FavoriteAdd`,favoriteAddDto);
  }
  public favoriteDelete(favoriteDeleteDto:FavoriteDeleteDto):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlUser}/FavoriteUser/FavoriteDelete/${favoriteDeleteDto.userId}/${favoriteDeleteDto.productId}`);
  }
  public favoriteGetAll():Observable<ProductDto[]>{
    let favoriteSearchDtoReq=new HttpParams();
    if(this.favoriteSearchDto.userId)favoriteSearchDtoReq= favoriteSearchDtoReq.append('userId',this.favoriteSearchDto.userId);
    return this.http.get<ProductDto[]>(`${this.backendUrlUser}/FavoriteUser/FavoriteGetAll`,{params: favoriteSearchDtoReq});
  }
  public favoriteSearchDtoSet(favoriteSearchDto:FavoriteSearchDto):void{
    this.favoriteSearchDto=favoriteSearchDto;
  }
}

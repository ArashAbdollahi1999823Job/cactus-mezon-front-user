import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StorePictureSearchDto} from "../../shared/dto/storePicture/storePictureSearchDto";
import {StoreUserPictureDto} from "../../shared/dto/storePicture/storeUserPictureDto";
@Injectable({
  providedIn: 'root'
})
export class StorePictureService {
  private backendUrlAdmin = environment.setting.url.backendUrlUser;
  public storePictureSearchDto = new StorePictureSearchDto();
  constructor(private http: HttpClient) { }
  public storePictureGetAll(): Observable<StoreUserPictureDto[]> {
    let storePictureReq =new HttpParams();
    if (this.storePictureSearchDto.storeId) storePictureReq = storePictureReq.append("storeId", this.storePictureSearchDto.storeId);
    if (this.storePictureSearchDto.id) storePictureReq=storePictureReq.append('id',this.storePictureSearchDto.id);
    if (this.storePictureSearchDto.sort) storePictureReq=storePictureReq.append('sort',this.storePictureSearchDto.sort);
    if (this.storePictureSearchDto.startRange) storePictureReq=storePictureReq.append('startRange',this.storePictureSearchDto.startRange);
    if (this.storePictureSearchDto.endRange) storePictureReq=storePictureReq.append('endRange',this.storePictureSearchDto.endRange);
    return this.http.get<StoreUserPictureDto[]>(`${this.backendUrlAdmin}/StorePictureUser/StorePictureGetAll`, {params: storePictureReq});
  }
  public storePictureSearchDtoGet() {
    return this.storePictureSearchDto;
  }
  public storePictureSearchDtoSet(storePictureSearchDto: StorePictureSearchDto) {
    this.storePictureSearchDto = storePictureSearchDto;
  }
}

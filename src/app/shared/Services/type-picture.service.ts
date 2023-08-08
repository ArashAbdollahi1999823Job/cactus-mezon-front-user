 import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypePictureParamDto} from "../dto/typePicture/typePictureParamDto";
import {TypePictureDto} from "../dto/typePicture/typePictureDto";
@Injectable({
  providedIn: 'root'
})

export class TypePictureService {
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public typePictureParam = new TypePictureParamDto();
  public constructor(private http: HttpClient) {}
  public typePictureSetParam(typePictureParam: TypePictureParamDto) {
    this.typePictureParam = typePictureParam;
  }
  public typePictureGetAll(): Observable<TypePictureDto[]> {
    let typePictureParam = this.generateProductTypePictureParams();
    return this.http.get<TypePictureDto[]>(`${this.backendUrlUser}/TypePictureUser/TypePictureGetAll`, {params: typePictureParam});
  }
  private generateProductTypePictureParams() {
    let requestParams = new HttpParams();
    if (this.typePictureParam.typeId) requestParams = requestParams.append("typeId", this.typePictureParam.typeId);
    if (this.typePictureParam.id) requestParams=requestParams.append('id',this.typePictureParam.id);
    requestParams=requestParams.append('minutesCache',environment.cache.type.typePicture)
    return requestParams;
  }
}

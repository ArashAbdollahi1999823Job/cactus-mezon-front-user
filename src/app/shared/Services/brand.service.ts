import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BrandSearchDto} from "../dto/brand/brandSearchDto";
import {PaginationDto} from "../dto/base/paginationDto";
import {BrandDto} from "../dto/brand/brandDto";
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private backendUrlUser = environment.setting.url.backendUrlUser;
  public brandSearchDto = new BrandSearchDto();
  public constructor(private http: HttpClient) {}
  public brandSearchDtoGet():BrandSearchDto {
    return this.brandSearchDto;
  }
  public brandSearchDtoSet(brandSearchDto: BrandSearchDto) {
    this.brandSearchDto = brandSearchDto;
  }
  public brandGetAll(): Observable<PaginationDto<BrandDto>> {
    let brandSearchDtoReq = new HttpParams();
    if (this.brandSearchDto.name) brandSearchDtoReq = brandSearchDtoReq.append("name", this.brandSearchDto.name);
    if (this.brandSearchDto.id) brandSearchDtoReq=brandSearchDtoReq.append('id',this.brandSearchDto.id);
    brandSearchDtoReq = brandSearchDtoReq.append('pageIndex', this.brandSearchDto.pageIndex);
    brandSearchDtoReq = brandSearchDtoReq.append('pageSize', this.brandSearchDto.pageSize);
    brandSearchDtoReq=brandSearchDtoReq.append('sortType',this.brandSearchDto.sortType);
    brandSearchDtoReq=brandSearchDtoReq.append('minutesCache',this.brandSearchDto.minutesCache)

    return this.http.get<PaginationDto<BrandDto>>(`${this.backendUrlUser}/BrandUser/BrandGetAll`, {params: brandSearchDtoReq});
  }
}

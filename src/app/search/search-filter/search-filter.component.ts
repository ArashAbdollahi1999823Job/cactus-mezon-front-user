import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SearchService} from "../services/search.service";
import {IBrandDto} from "../../shared/dtos/product/IBrandDto";
import {ITypeDto} from 'src/app/shared/dtos/product/ITypeDto';
import {RequestShopParamsDto} from "../../shared/dtos/RequestShopParamsDto";
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})


export class SearchFilterComponent implements OnInit {
  @Output() UpdateProduct=new EventEmitter<boolean>();
  public filterProductParams: RequestShopParamsDto | undefined;
  public brands: IBrandDto[] | undefined;
  public types: ITypeDto[] | undefined;
  @ViewChild("search",{static:false}) searchTerm: ElementRef | undefined;
  sortOptions=[
    {key:1,title:'اسم'},
    {key:2,title:'قیمت'},
  ];
  sortTypeOptions=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];

  constructor(private ef: ElementRef, private searchService: SearchService) {}
  ngOnInit(): void {
    this.filterProductParams = this.searchService.getParams();
    this.getBrands();
    this.getTypes();
  }
  private getBrands() {
    return this.searchService.getBrands().subscribe((res) => {
      this.brands = res;
    });
  }
  private getTypes() {
    return this.searchService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }
/*  toggleMenu($event: any) {
    let id = $event.srcElement.attributes.pid.value;
    let content = this.ef.nativeElement.querySelectorAll(`[cid*="` + id + `"]`)[0];
    let i = this.ef.nativeElement.querySelectorAll(`[piid*="` + id + `"]`)[0];
    if (i.classList.contains("fa-plus")) {
      i.classList.remove("fa-plus");
      i.classList.add('fa-minus');
    } else {
      i.classList.remove('fa-minus');
      i.classList.add("fa-plus");
    }
    if (content.style.height == 0 || null) {
      content.style.height = 'auto';
    } else if (content.style.height == '0px') {
      content.style.height = 'auto';
    } else {
      content.style.height = 0;
    }
  }*/
  onChangeType(typeId: any) {
    // @ts-ignore
    this.filterProductParams.typeId=typeId;
    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);
  }
  onChangeBrand(brandId: any) {
    // @ts-ignore
    this.filterProductParams.brandId=brandId;
    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);
  }
  onChangeSort(sort: any) {
    // @ts-ignore
    this.filterProductParams.sort=sort;
    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);
  }
  onChangeTypeSort(sortType: any) {
    // @ts-ignore
    this.filterProductParams.sortType=sortType;
    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);
  }

  changeSearch() {
    // @ts-ignore
    this.filterProductParams.search=this.searchTerm?.nativeElement?.value;

    // @ts-ignore
    this.searchService.setParams(this.filterProductParams);
    this.UpdateProduct.emit(true);
  }
}

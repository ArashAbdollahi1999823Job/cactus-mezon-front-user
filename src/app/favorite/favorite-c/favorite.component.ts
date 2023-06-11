import {Component, OnInit} from '@angular/core';
import {ProductDto} from "../../shared/dto/product/productDto";
import {Subscription} from "rxjs";
import {FavoriteService} from "../favorite-service/favorite.service";
import {AuthService} from "../../auth/Services/auth.service";
import {FavoriteSearchDto} from "../../shared/dto/favorite/favoriteSearchDto";
@Component({
  selector: 'favorite-c',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  public productDtos:ProductDto[];
  public subscription:Subscription;
  constructor(private favoriteService:FavoriteService,private authService:AuthService) {}
  ngOnInit(): void {
    this.favoriteGetAll();
  }
  public favoriteGetAll():void{
    let favoriteSearchDto=new FavoriteSearchDto();
    favoriteSearchDto.userId=this.authService.getUserId();
    this.favoriteService.favoriteSearchDtoSet(favoriteSearchDto);
    this.subscription=this.favoriteService.favoriteGetAll().subscribe((productDtoRes:ProductDto[])=>{
      if(productDtoRes)this.productDtos=productDtoRes;
    })
  }
  public favoriteUpdate(updated: boolean):void {
    if (updated) this.favoriteGetAll();
  }
}

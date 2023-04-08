import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IUserDto} from "../../shared/dto/identity/IUserDto";
import {ILoginDto} from "../../shared/dto/identity/ILoginDto";
import {HttpClient} from "@angular/common/http";
import {IRegisterDto} from "../../shared/dto/identity/IRegisterDto";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl=environment.backendUrl;
// @ts-ignore
  private currentUser=new BehaviorSubject<IUserDto>(null);
  public currentUser$=this.currentUser.asObservable();
  constructor(private http:HttpClient,private router:Router) { }

  public login(loginDto:ILoginDto):Observable<IUserDto>{
    return this.http.post<IUserDto>(`${this.backendUrl}/account/login`,loginDto).pipe(map((res):IUserDto=>{
      if(res){
        this.setCurrentUser(res);
        return res;
      }
      // @ts-ignore
        return null;
    })
    );
  }
  public register(registerDto:IRegisterDto){
    return this.http.post<IUserDto>(`${this.backendUrl}/account/register`,registerDto).pipe(map((res:IUserDto)=>{
      if (res){
        this.setCurrentUser(res);
        return res;
      }
      return null;
    }))
  }
  public logout(){
    localStorage.removeItem(environment.keyUserToken);
    // @ts-ignore
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }



  public setCurrentUser(user:IUserDto){
    if(user){
      localStorage.setItem(environment.keyUserToken,JSON.stringify(user))
      this.currentUser.next(user);
    }
  }
}

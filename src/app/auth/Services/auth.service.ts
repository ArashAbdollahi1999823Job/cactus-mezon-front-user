import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {LoginDto} from "../../shared/dto/identity/loginDto";
import {HttpClient} from "@angular/common/http";
import {IRegisterDto} from "../../shared/dto/identity/IRegisterDto";
import {Router} from "@angular/router";
import {PresenceService} from "../../shared/Services/presence.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrlUser=environment.backendUrlUser;
  private currentUser=new BehaviorSubject<UserAuthorizeDto>(null);
  public currentUser$=this.currentUser.asObservable();
  constructor(private http:HttpClient,private router:Router,private presenceService:PresenceService) { }
  public login(loginDto:LoginDto):Observable<UserAuthorizeDto>{
    return this.http.put<UserAuthorizeDto>(`${this.backendUrlUser}/AccountUser/UserLogin`,loginDto).pipe(map((res):UserAuthorizeDto=>{
      if(res){
        this.setCurrentUser(res);
        this.presenceService.createHubConnection(res);
        return res;
      }
        return null;
    })
    );
  }
  public register(registerDto:IRegisterDto){
    return this.http.post<UserAuthorizeDto>(`${this.backendUrlUser}/account/register`,registerDto).pipe(map((res:UserAuthorizeDto)=>{
      if (res){
        this.setCurrentUser(res);
        this.presenceService.createHubConnection(res);
        return res;
      }
      return null;
    }))
  }
  public logout(){
    localStorage.removeItem(environment.keyUserToken);
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
    this.presenceService.stopHubConnection();
  }
  public setCurrentUser(user:UserAuthorizeDto){
    if(user){
      localStorage.setItem(environment.keyUserToken,JSON.stringify(user))
      this.currentUser.next(user);
    }
  }
}

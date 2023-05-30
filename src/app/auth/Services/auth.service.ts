import {Injectable} from '@angular/core';
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
  private backendUrlUser = environment.backendUrlUser;
  private currentUser = new BehaviorSubject<UserAuthorizeDto>(null);
  public currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient, private router: Router, private presenceService: PresenceService) {}
  public login(loginDto: LoginDto): Observable<UserAuthorizeDto> {
    return this.http.put<UserAuthorizeDto>(`${this.backendUrlUser}/AccountUser/UserLogin`, loginDto).pipe(map((userAuthorizeDtoRes): UserAuthorizeDto => {
        if (userAuthorizeDtoRes) {
          this.setCurrentUser(userAuthorizeDtoRes);
          localStorage.setItem(environment.storage.myPhoneNumber, this.getPhoneNumber());
          this.presenceService.createHubConnection(userAuthorizeDtoRes);
          return userAuthorizeDtoRes;
        }
        return null;
      })
    );
  }
  public getToken() {
    const user = <UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      return user.token;
    }
    return null
  }
  public register(registerDto: IRegisterDto) :Observable<UserAuthorizeDto>{
    return this.http.post<UserAuthorizeDto>(`${this.backendUrlUser}/account/register`, registerDto).pipe(map((res: UserAuthorizeDto) => {
      if (res) {
        this.setCurrentUser(res);
        localStorage.setItem(environment.storage.myPhoneNumber, this.getPhoneNumber());
        this.presenceService.createHubConnection(res);
        return res;
      }
      return null;
    }))
  }
  public logout() {
    localStorage.removeItem(environment.keyUserToken);
    this.currentUser.next(null);
    this.router.navigateByUrl('/Cactus');
    this.presenceService.stopHubConnection();
  }
  public setCurrentUser(userAuthorizeDto: UserAuthorizeDto) {
    if (userAuthorizeDto) {
      localStorage.setItem(environment.keyUserToken, JSON.stringify(userAuthorizeDto))
      this.currentUser.next(userAuthorizeDto);
    }
  }
  public decodeToken(token: string){
    if(token){
    return JSON.parse(atob(token.split('.')[1]))
    }
  }
  public getPhoneNumber(): string {
    return this.decodeToken(this.getToken())?.PhoneNumber;
  }
}

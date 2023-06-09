import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {LoginDto} from "../../shared/dto/identity/loginDto";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PresenceService} from "../../shared/Services/presence.service";
import {RegisterDto} from "../../shared/dto/identity/registerDto";
import {CodeDto} from "../../shared/dto/identity/codeDto";
import {RegisterReturnDto} from "../../shared/dto/identity/registerReturnDto";
import {ForgetDto} from "../../shared/dto/identity/forgetDto";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrlUser = environment.backendUrlUser;
  private currentUser = new BehaviorSubject<UserAuthorizeDto>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router, private presenceService: PresenceService) {
  }

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

  public register(registerDto: RegisterDto): Observable<RegisterReturnDto> {
    return this.http.post<RegisterReturnDto>(`${this.backendUrlUser}/AccountUser/UserRegister`, registerDto);
  }

  public codeSend(codeDto: CodeDto): Observable<UserAuthorizeDto> {
    return this.http.post<UserAuthorizeDto>(`${this.backendUrlUser}/AccountUser/UserCode`, codeDto).pipe(map((userAuthorizeDtoRes: UserAuthorizeDto) => {
      if (userAuthorizeDtoRes) {
        this.setCurrentUser(userAuthorizeDtoRes);
        localStorage.setItem(environment.storage.myPhoneNumber, this.getPhoneNumber());
        this.presenceService.createHubConnection(userAuthorizeDtoRes);
        return userAuthorizeDtoRes;
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

  public userDelete(phoneNumber: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.backendUrlUser}/AccountUser/UserDelete/${phoneNumber}`);
  }

  public setCurrentUser(userAuthorizeDto: UserAuthorizeDto) {
    if (userAuthorizeDto) {
      localStorage.setItem(environment.keyUserToken, JSON.stringify(userAuthorizeDto))
      this.currentUser.next(userAuthorizeDto);
    }
  }

  public decodeToken(token: string) {
    if (token) {
      return JSON.parse(atob(token.split('.')[1]))
    }
  }

  public getPhoneNumber(): string {
    return this.decodeToken(this.getToken())?.PhoneNumber;
  }

  public forgetSend(forgetDto:ForgetDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlUser}/AccountUser/UserForget`,forgetDto);
  }
}

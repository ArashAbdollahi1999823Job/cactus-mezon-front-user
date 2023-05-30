import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {allPageAnimation} from "../../shared/animations/allPageAnimation";

@Component({
  selector: 'app-auth-c',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations:[allPageAnimation]
})
export class AuthComponent implements OnInit {
  currentUser$: Observable<UserAuthorizeDto>;
  constructor(private authService: AuthService, private router: Router,private changeRef: ChangeDetectorRef) {
  }
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.navigateUserByAuth();
  }

  private navigateUserByAuth() {
    this.currentUser$.subscribe((res) => {
      if (res) {
        this.router.navigateByUrl("/auth/profile")
      } else {
        this.router.navigateByUrl("/auth/login")
      }
    })
  }
}

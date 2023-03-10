import {Component, OnInit} from '@angular/core';
import {isEmpty, Observable} from "rxjs";
import {IUserDto} from "../../shared/dtos/identity/IUserDto";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {allPageAnimation} from "../../shared/animations/allPageAnimation";

@Component({
  selector: 'app-auth-c',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations:[allPageAnimation]
})
export class AuthComponent implements OnInit {
  // @ts-ignore
  currentUser$: Observable<IUserDto>;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
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

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "../../auth/Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {IUserDto} from "../dtos/identity/IUserDto";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private toast: ToastrService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.currentUser$.pipe(map((user) => {
      if (user) {
        return true;
      } else {
        this.toast.error("ابتدا وارد سایت شوید");
        this.router.navigateByUrl("/auth/login");
        return false;
      }
    }));
  }

}

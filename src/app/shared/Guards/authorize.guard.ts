import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {map} from 'rxjs';
import {AuthService} from "../../auth/Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard  {
  constructor(private authService: AuthService, private toast: ToastrService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.currentUser$.pipe(map((user) => {
      if (user) {
        return true;
      } else {
        this.toast.error(environment.messages.common.pleaseEnterSite);
        this.router.navigateByUrl("/auth/login");
        return false;
      }
    }));
  }

}

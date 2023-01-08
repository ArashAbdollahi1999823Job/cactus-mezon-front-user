import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastrService, private router: Router) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.error.statusCode) {
            case 404:
              this.router.navigateByUrl("/search");
              this.toastService.error(error.error.message)
              break;
            default:
              break;
          }
        }
        return throwError(() => {
          this.toastService.error(error.error.message)
          return error;
        })
      })
    )
  }
}

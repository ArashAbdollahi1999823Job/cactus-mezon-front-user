import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginDto} from "../../shared/dto/identity/loginDto";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public subscription:Subscription;
  @ViewChild('password') password: ElementRef;
  public toggle: boolean = false;
  loginForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"),Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)])
  })
  constructor(private authService: AuthService,private formBuilder: FormBuilder,private toast:ToastrService,private router:Router) {
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
   this.subscription= this.authService.login(<LoginDto>this.loginForm.value).subscribe((userAuthorizeDtoRes:UserAuthorizeDto)=>{
      if(userAuthorizeDtoRes){
        this.toast.success(environment.messages.common.loginSuccess,userAuthorizeDtoRes.username)
        this.router.navigateByUrl("/Cactus")
      }
    });
  }

  public togglePassword():void {
    this.toggle = !this.toggle;
    if (this.toggle == true) this.password.nativeElement.type = 'text';
    if (this.toggle != true) this.password.nativeElement.type = 'password';
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

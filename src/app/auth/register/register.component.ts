import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {RegisterDto} from "../../shared/dto/identity/registerDto";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RegisterReturnDto} from "../../shared/dto/identity/registerReturnDto";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  private subscription:Subscription;
  @ViewChild('password2') password2: ElementRef;
  @ViewChild('password') password: ElementRef;
  public toggle: boolean = false;
  registerForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8),Validators.pattern("^[a-zA-Z0-9]*$")]),
    passwordConfirm: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]),
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)])
  })
  constructor(private authService: AuthService, private toast: ToastrService,private router:Router) {
    this.registerForm.addValidators(this.createCompareValidator(this.registerForm.get('password'), this.registerForm.get('passwordConfirm')));
  }
  public register():void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    }
   this.subscription =this.authService.register(<RegisterDto>this.registerForm.value).subscribe((registerReturnDtoRes: RegisterReturnDto) => {
      if (registerReturnDtoRes) {
        this.toast.success(environment.messages.common.registerSuccess);
        localStorage.setItem(environment.storage.myPhoneNumberForAuth,registerReturnDtoRes.phoneNumber);
        this.router.navigateByUrl("auth/Code")
      }
    });
  }

  public createCompareValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }
  public togglePassword():void {
    this.toggle = !this.toggle;
    if (this.toggle == true) this.password.nativeElement.type = 'text';
    if (this.toggle != true) this.password.nativeElement.type = 'password';

    if (this.toggle == true) this.password2.nativeElement.type = 'text';
    if (this.toggle != true) this.password2.nativeElement.type = 'password';
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

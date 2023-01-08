import {Component, OnInit} from '@angular/core';
import {AuthService} from "../Services/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginDto} from "../../shared/dtos/identity/ILoginDto";
import {ToastrService} from "ngx-toastr";
import {IUserDto} from "../../shared/dtos/identity/IUserDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  public myForm: FormGroup;
  // @ts-ignore
  loginForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"),Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)])
  })

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private toast:ToastrService,private router:Router) {
  }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      mob: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    })
  }

  get m(){
    return this.myForm.controls;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.authService.login(<ILoginDto>this.loginForm.value).subscribe((res:IUserDto)=>{
      if(res){
        this.toast.success("ورود با موفقیت انجام شد",res.username)
        this.router.navigateByUrl("/auth/profile")
      }
    });
  }
}

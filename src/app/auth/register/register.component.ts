import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {IRegisterDto} from "../../shared/dto/identity/IRegisterDto";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(30), Validators.minLength(8)]),
    username: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(5)])
  })

  constructor(private authService: AuthService, private toast: ToastrService) {
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    }
    this.authService.register(<IRegisterDto>this.registerForm.value).subscribe((res: UserAuthorizeDto) => {
      if (res) {
        this.toast.success("ثبت نام موفقیت انجام شد", res.username)
      }
    });
  }
}

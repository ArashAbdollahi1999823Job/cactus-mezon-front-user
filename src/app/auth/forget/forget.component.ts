import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../Services/auth.service";
import {ForgetDto} from "../../shared/dto/identity/forgetDto";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {

  private subscription:Subscription;
  forgetForm = new FormGroup({
    phoneNumber: new FormControl("", [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
  })
  constructor(private toastService:ToastrService,private authService:AuthService) {
  }

  public forgetSend():void {
    this.subscription =this.authService.forgetSend(<ForgetDto>this.forgetForm.value).subscribe((res: boolean) => {
      if (res==true) {
        this.toastService.success(environment.messages.auth.forgetPasswordSendSuccess);
      }
    });
  }
}

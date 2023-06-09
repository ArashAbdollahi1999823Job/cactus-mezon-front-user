import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CodeDto} from "../../shared/dto/identity/codeDto";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
@Component({
  selector: 'code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @ViewChild('timerEl', {static: false}) timerEl: ElementRef;
  public interval;
  codeForm = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)])
  })
  constructor(private authService: AuthService, private toast: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.timer();
  }
  public codeSend(): void {
    let codeDto = new CodeDto();
    codeDto.code = this.codeForm.controls.code.value;
    codeDto.phoneNumber = localStorage.getItem(environment.storage.myPhoneNumberForAuth);
    this.subscription = this.authService.codeSend(codeDto).subscribe((userAuthorizeDtoRes: UserAuthorizeDto) => {
      if (userAuthorizeDtoRes) {
        this.toast.success(environment.messages.common.confirmPhoneNumberSuccess)
        this.router.navigateByUrl("Cactus")
      }
    });
  }
  public timer(): void {
    let sec = Number(environment.setting.auth.secondEndCode);
    this.interval = setInterval(() => {
      sec = sec - 1
      if (sec == 0) {
        this.userDelete();
      }
      this.timerEl.nativeElement.innerHTML = sec;
    }, 1000);
  }
  public userDelete(): void {
    this.subscription = this.authService.userDelete(localStorage.getItem(environment.storage.myPhoneNumberForAuth)).subscribe((res: boolean) => {
      if (res == true) {
        this.toast.info(environment.messages.common.confirmPhoneNumberNotDonePleaseRegisterAgain)
        this.router.navigateByUrl('Cactus');
      }
    })
  }
  ngOnDestroy(): void {
    let checkLogin;
    this.subscription = this.authService.currentUser$.subscribe((user: UserAuthorizeDto) => {
      checkLogin = !!user;
    })
    if (!checkLogin) setTimeout(() => {
      this.userDelete();
    })
    clearInterval(this.interval);
    if (this.subscription) this.subscription.unsubscribe();
  }
}

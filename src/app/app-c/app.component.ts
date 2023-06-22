import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {environment} from "../../environments/environment";
import {UserAuthorizeDto} from "../shared/dto/identity/userAuthorizeDto";
import {AuthService} from "../auth/Services/auth.service";
import {allPageAnimation} from "../shared/animations/allPageAnimation";
import {PresenceService} from "../shared/Services/presence.service";
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[allPageAnimation]
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'فروشگاه بزرگ کاکتوس';
  constructor(private authService:AuthService,private presenceService:PresenceService,private ef:ElementRef,private renderer: Renderer2) {}
  ngOnInit(): void {
    this.initialUser();
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.all'), 'height', window.innerHeight+ "px");
  }
  private initialUser() {
    const user=<UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.storage.userToken))
    if (user) {
      this.authService.setCurrentUser(user)
      this.presenceService.createHubConnection(user);
    }
  }
}

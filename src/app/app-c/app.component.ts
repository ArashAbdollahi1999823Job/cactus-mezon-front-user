import {Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit{
  title = 'فروشگاه بزرگ کاکتوس';
  constructor(private authService:AuthService,private presenceService:PresenceService) {}
  ngOnInit(): void {
    this.initialUser();
  }


  private initialUser() {
    const user=<UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      this.authService.setCurrentUser(user)
      this.presenceService.createHubConnection(user);
    }
  }
}

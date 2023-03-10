import { Component } from '@angular/core';
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {

  constructor(private authService:AuthService) {}
  logout() {
    this.authService.logout();
  }
}

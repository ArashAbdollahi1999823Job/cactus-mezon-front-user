import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent  {
constructor(private title:Title) {
  this.title.setTitle("فروشگاه بزرگ کاکتوس")
}
}

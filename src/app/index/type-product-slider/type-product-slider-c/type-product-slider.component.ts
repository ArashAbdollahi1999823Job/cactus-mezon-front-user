import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {environment} from "../../../../environments/environment.prod";

@Component({
  selector: 'type-product-slider',
  templateUrl: './type-product-slider.component.html',
  styleUrls: ['./type-product-slider.component.scss']
})
export class TypeProductSliderComponent {
  slider: Element | null | undefined;
  @Input("typeDto") typeDto:TypeDto;
  @ViewChild('key') key:ElementRef;

  btnClickRight() {
    this.slider = this.key.nativeElement;
    let scrollRight = setInterval(() => {
      this.slider.scrollLeft += 3;
    }, 1)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 600)
  }

  btnClickLeft() {
    this.slider = this.key.nativeElement;
    let scrollRight = setInterval(() => {
        this.slider.scrollLeft -= 2;
      },
      3)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 630)
  }
}

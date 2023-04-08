import {Component, Input} from '@angular/core';
import {TypeDto} from "../../shared/dto/type/typeDto";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-slider-card-woman',
  templateUrl: './slider-card-woman.component.html',
  styleUrls: ['./slider-card-woman.component.scss']
})
export class SliderCardWomanComponent {
  slider: Element | null | undefined;
  @Input("typeDto") typeDto:TypeDto;

  btnClickRight() {
    this.slider = document.querySelector('.container-slider-card-woman-items')
    // @ts-ignore
    let scrollRight = setInterval(() => {
      // @ts-ignore
      this.slider.scrollLeft += 3;
    }, 1)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 600)
  }

  btnClickLeft() {
    this.slider = document.querySelector('.container-slider-card-woman-items')
    // @ts-ignore
    let scrollRight = setInterval(() => {
        // @ts-ignore
        this.slider.scrollLeft -= 2;
      },
      3)
    setTimeout(() => {
      clearInterval(scrollRight);
    }, 630)
  }
}

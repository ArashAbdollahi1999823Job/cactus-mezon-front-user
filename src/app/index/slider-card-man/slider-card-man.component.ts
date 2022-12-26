import {Component} from '@angular/core';
@Component({
  selector: 'app-slider-card-man',
  templateUrl: './slider-card-man.component.html',
  styleUrls: ['./slider-card-man.component.scss']
})
export class SliderCardManComponent {
 slider: Element | null | undefined;
  btnClickRight() {
    this.slider = document.querySelector('.container-slider-card-items')
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
    this.slider = document.querySelector('.container-slider-card-items')
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

  showDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width="30%";
    cardDetails.style.width = "60px";
    cardDetails.style.borderRight = "1px solid black";
    // @ts-ignore
    detailsButton.forEach(x => {
      x.style.fontSize='1.7vh';
    })
  }

  hideDetails(event: any) {
    let cardDetails = event.srcElement.querySelector('.card-details');
    let detailsButton = event.srcElement.querySelectorAll('.details-button');
    let cardEnterProduct = event.srcElement.querySelectorAll('.card-enter-product')[0];
    cardEnterProduct.style.width="0";
    // @ts-ignore
    detailsButton.forEach(x => {
      x.style.fontSize='1vh';
    })
    cardDetails.style.width = "15px";
    cardDetails.style.borderRight = "0px solid black";
  }
}

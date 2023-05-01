import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProductDto} from "../../../shared/dto/product/productDto";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnChanges {
  @Input('productDto') productDto: ProductDto;
  @ViewChild('timerEl') timerEl: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    this.timer()
  }

  timer() {
    if (this?.productDto?.off) {
      let end = new Date(this.productDto.off.endDate)
      let now = new Date();
      let sec =
        ((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), end.getHours(), end.getMinutes(), end.getSeconds())
          - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())) / (1000));
      setInterval(() => {
        sec = sec - 1
        const seconds = Math.floor(sec % 60);
        const minutes = Math.floor((sec % 3600) / 60);
        const hours = Math.floor((sec % (3600 * 24)) / 3600);
        const days = Math.floor(sec / (3600 * 24));
        this.timerEl.nativeElement.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
      }, 1000)
    }
  }


  change(event: HTMLElement) {
    let classToShow = event.id.toString();
    let elementToHide = document.getElementsByClassName('end-paper');
    for (let i = 0; i < elementToHide.length; i++) {
      elementToHide.item(i).classList.add('hide');
      elementToHide.item(i).classList.remove('show');
    }
    document.getElementsByClassName(event.id.toString())[0].classList.add('show')
  }
}

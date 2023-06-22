import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'slider-two',
  templateUrl: './slider-two.component.html',
  styleUrls: ['./slider-two.component.scss']
})
export class SliderTwoComponent implements OnInit ,OnDestroy{
  public backendUrlPicture=environment.setting.url.backendUrlPicture;
  @Input('typeDto') typeDto:TypeDto;

  public slide;
  public prev;
  public next;
  public n=0;
  public interval;

  ngOnInit(): void {
    this.slide=document.getElementsByClassName('slide');
    this.prev=document.querySelector('.prev');
    this.next=document.querySelector('.next');

  this.interval=  setInterval(()=>{
      this.plus();
    },3000)
  }

  public displayNone(){
    for(let i=0;i<this.slide.length;i++){
      this.slide[i].style.display='none'
    }
  }
  public noActive(){
    for(let i=0;i<this.slide.length;i++){
      this.slide[i].classList.remove('active')
    }
  }

  public plus(){
    this.n++;
    if(this.n>this.slide.length-1){
      this.n=0
    }
    this.displayNone();
    this.noActive();
    this.slide[this.n].style.display='block';
    this.slide[this.n].classList.add('active')
  }
  public minus(){
    this.n--;
    if(this.n<0){
      this.n=this.slide.length-1;
    }
    this.displayNone();
    this.noActive();
    this.slide[this.n].style.display='block';
    this.slide[this.n].classList.add('active')
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}

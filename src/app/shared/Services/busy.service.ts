import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private  busyRequestCount=new BehaviorSubject<number>(0);
  constructor(private spinnerService:NgxSpinnerService) { }

  show(){
    this.busyRequestCount.next(this.busyRequestCount.value+1);
    this.spinnerService.show(undefined,{bdColor:'rgba(0, 0, 0, 0.8)',color:'#fff',fullScreen:true,size:"large",type:"line-scale-pulse-out"});
  }

  hide(){
    this.busyRequestCount.next(this.busyRequestCount.value-1);
    if(this.busyRequestCount.value<=0){
      this.busyRequestCount.next(0);
      this.spinnerService.hide();
    }
  }
}

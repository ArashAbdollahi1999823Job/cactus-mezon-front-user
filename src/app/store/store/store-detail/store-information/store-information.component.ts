import {Component, Input} from '@angular/core';
import {StoreDto} from "../../../../shared/dto/store/storeDto";

@Component({
  selector: 'store-information',
  templateUrl: './store-information.component.html',
  styleUrls: ['./store-information.component.scss']
})
export class StoreInformationComponent {
  @Input("storeDto") storeDto:StoreDto;
}

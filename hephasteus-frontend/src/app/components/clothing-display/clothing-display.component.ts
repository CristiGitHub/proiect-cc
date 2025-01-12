import {Component, Input} from '@angular/core';
import {Clothing} from "../../model/Clothing";

@Component({
  selector: 'app-clothing-display',
  templateUrl: './clothing-display.component.html',
  styleUrls: ['./clothing-display.component.css']
})
export class ClothingDisplayComponent {

  @Input() clothing!:Clothing;

}

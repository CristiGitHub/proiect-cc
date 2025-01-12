import {Component, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {ClothesService} from "../../service/clothes.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SavedOutfitsService} from "../../service/savedOutfits.service";
import {Clothing} from "../../model/Clothing";
import {SavedOutfits} from "../../model/SavedOutfits";

@Component({
  selector: 'app-outfits',
  templateUrl: './outfits.component.html',
  styleUrls: ['./outfits.component.css']
})
export class OutfitsComponent implements OnInit{

  savedOutfit:SavedOutfits[]=[];
  dataService:DataService;

  savedOutfitsService:SavedOutfitsService;
  clothesService:ClothesService;


  constructor(dataService:DataService, clothesService:ClothesService, private http: HttpClient,  savedOutfitsService: SavedOutfitsService) {
    this.dataService=dataService;
    this.savedOutfitsService=savedOutfitsService;
    this.clothesService=clothesService;
  }

  getSeverity(availability:boolean) {
    if(availability){
      return 'success';
    }
    else {
      return 'warning';
    }
  }
  getAvailabilityText(availability:boolean){
    if(availability){
      return 'available';
    }
    else{
      return "unavailable"
    }
  }

  ngOnInit(): void {
    this.savedOutfitsService.getAllOutfits().subscribe(response=>{
      this.savedOutfit = response;
    })
  }

}

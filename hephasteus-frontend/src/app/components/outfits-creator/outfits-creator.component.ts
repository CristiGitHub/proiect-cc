import {Component, OnInit} from '@angular/core';
import {Clothing} from "../../model/Clothing";
import {DataService} from "../../service/data.service";
import {ClothesService} from "../../service/clothes.service";
import {SavedOutfits} from "../../model/SavedOutfits";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SavedOutfitsService} from "../../service/savedOutfits.service";
import {BasicDto} from "../../model/BasicDto";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-outfits-creator',
  templateUrl: './outfits-creator.component.html',
  styleUrls: ['./outfits-creator.component.css']
})
export class OutfitsCreatorComponent  implements OnInit{

  // form: FormGroup;

  clothesList:Clothing[]=[];
  savedOutfit!:SavedOutfits;
  selectedClothesList:Clothing[]=[];
  dataService:DataService;

  seasonEnum!:BasicDto[];
  occasionEnum!:BasicDto[];

  savedOutfitsService:SavedOutfitsService;
  clothesService:ClothesService;
  id!:string;

  constructor(dataService:DataService,clothesService:ClothesService, private activedRoute: ActivatedRoute, private http: HttpClient,  savedOutfitsService: SavedOutfitsService) {
    this.dataService=dataService;
    this.savedOutfitsService=savedOutfitsService;
    this.clothesService=clothesService;
    this.activedRoute.params.subscribe(params=>{
      this.id=params['id'];
      console.log(params['id']);
    })
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
  if( this.id == undefined || this.id == null){
    this.clothesService.getAllClothing().subscribe(value => {
      this.clothesList=value;
      this.dataService.getEnums().subscribe(data=>{
        this.seasonEnum=data['SeasonsEnum']
        this.occasionEnum=data['OccasionsEnum']
        this.savedOutfit = new SavedOutfits();
        this.savedOutfit.season=this.seasonEnum[0];
        this.savedOutfit.occasion=this.occasionEnum[0];
        console.log(this.seasonEnum);
        console.log(this.occasionEnum);
      })
    })
  }
  else{
    this.savedOutfitsService.getOutfit(this.id).subscribe(response=>{
      this.savedOutfit=response;
      this.clothesService.getAllClothing().subscribe(value => {
        this.dataService.getEnums().subscribe(data=>{
          this.seasonEnum=data['SeasonsEnum']
          this.occasionEnum=data['OccasionsEnum']
          console.log(this.seasonEnum);
          console.log(this.occasionEnum);
        })
        this.clothesList=value;
        this.clothesList = this.clothesList.filter(obj1 => {
          return !this.savedOutfit.clothesIds.find(obj2 => {
            return obj1.id === obj2;
          });
        });
      })      // if( this.savedOutfit.clothesIds.length>0){
      //   this.savedOutfit.clothes=[]
      //   this.savedOutfit.clothesIds.forEach(value => {
      //     this.clothesService.getClothing(value).subscribe(response=>{
      //       this.savedOutfit.clothes.push(response);
      //     })
      //     console.log(this.savedOutfit.clothes)
      //   })
      // }
    })
  }

  }

  submitOutfit(){
    // if(!this.form.dirty){
    this.savedOutfit.clothesIds=[];
    this.savedOutfit.clothes.forEach(value => {
      this.savedOutfit.clothesIds.push(value.id);
    })
    if(this.savedOutfit.id != undefined && this.id != undefined && this.id===this.savedOutfit.id){
      this.savedOutfitsService.putOutfit(this.savedOutfit,this.id).subscribe(reasponse=>{
        this.savedOutfit=reasponse
      })
    }
    else {
      this.savedOutfitsService.postOutfit(this.savedOutfit).subscribe(respose=>{
        this.savedOutfit=respose;
      })
    }

  }
  deleteOutfit(){
    if(confirm("Are you sure You want to delete this?")) {
    this.savedOutfitsService.deleteOutfit(this.savedOutfit.id).subscribe(value=>{
      console.log(value);
    })}
  }

}

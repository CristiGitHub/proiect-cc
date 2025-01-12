import {Component, Input, OnInit} from "@angular/core";
import {DataService} from "../../service/data.service";
import {Clothing} from "../../model/Clothing";
import {ClothesBrand} from "../../model/ClothesBrand";
import {ClothesCatergory} from "../../model/ClothesCatergory";
import {ClothesService} from "../../service/clothes.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-clothingModal',
  templateUrl: './clothingModal.component.html',
  styleUrls: ['clothingModal.component.css']
})

export class ClothingModalComponent implements OnInit{
   clothing!:Clothing;
   id!:string
    image:any
    state!:number
   dataService!:DataService;
   clothesService!:ClothesService;
  clothesBrandList:ClothesBrand[]=[];
  clothesCategoryList:ClothesCatergory[]=[];

  sizeCharter:string[]=[];
  constructor(dataService:DataService, clothesService:ClothesService, private activedRoute: ActivatedRoute, private http: HttpClient) {
    this.dataService=dataService;
    this.clothesService=clothesService;
    this.activedRoute.params.subscribe(params=>{
      this.id=params['id'];
      console.log(params['id']);
    })
  }
  ngOnInit(){
      this.clothesCategoryList=this.dataService.loadDataClothesCategory();
   this.dataService.loadDataClothesBrand().subscribe(value => {
       console.log(value)
       this.sizeCharter=this.dataService.loadSizeChart();
       this.clothesBrandList=value
       if(this.id){
           this.loadClothing(this.id);
       }
       else{
           this.state=0;
           this.clothing=new Clothing();
       }
   });
  }

  loadClothing(id:string){
      this.id=id;
      this.clothesService.getClothing(id).subscribe(value => {
          this.clothing=value;
          this.getImage(this.clothing.imageUrl).subscribe(response=>{
              this.clothing.image=response;
          })
          if( this.clothing.name.includes("Temp")){
              this.clothing.name="";
              this.state=1;
          }
          else{
              this.state=2;
          }
      })
  }

  onSubmitClothes(){
      if(this.state==0){
          this.onUpload();
      }
      else{
          this.clothesService.putClothing(this.clothing,this.id).subscribe( value => {
              this.clothing=value;
              this.loadClothing(this.clothing.id);
          })
      }}

    onUpload(): void {
      console.log(this.image)
        const file = new FormData();
        file.append('file', this.image);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        console.log("12313");
        this.http
            .post('http://localhost:8085/api/v1/clothing/classify', file, { headers: headers, responseType: 'text' })
            .subscribe(
                (response) => {
                    console.log(response)
                    this.loadClothing(response)
                }
            );
    }
    trimite(event:any):void{
      this.image=event.files[0]
      // alert("salit");
    }

    deleteUplodImage(event:any):void{
      this.image=null;
    }

    onDeleteClothes(){
        if(confirm("Are you sure You want to delete this?")) {
            this.clothesService.deleteClothing(this.clothing.id).subscribe(value=>{
                console.log(value);
            })}
    }


    getImage(imageName: string): Observable<string> {
        return this.http.get(`http://localhost:8085/images/${imageName}`, { responseType: 'text' });
    }



}

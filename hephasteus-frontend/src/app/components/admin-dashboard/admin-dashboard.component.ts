import {Component, OnInit} from '@angular/core';
import {ClothesBrand} from "../../model/ClothesBrand";
import {ClothesBrandService} from "../../service/clothesBrand.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  public displayDialog:boolean=false;
  public displayDialogOption:number=0;
  public headerValue:string='';

  idObject:string='';
  clothesBrand!:ClothesBrand;
  clothesBrandList:ClothesBrand[]=[];
  cloathesBrandService:ClothesBrandService;
  constructor(cloathesBrandService:ClothesBrandService) {
    this.cloathesBrandService=cloathesBrandService;
  }
  ngOnInit(): void {
  }



  displayOption(index:number){
    this.displayDialog=true;
    this.displayDialogOption=index;
    this.headerOption(index);
    if(index==1){
      this.clothesBrand=new ClothesBrand();
    }
    if(index==2){
      this.cloathesBrandService.getAllClothingBrand().subscribe(value =>{
        this.clothesBrandList=value;
        this.clothesBrandList.forEach(x=>{
        x.redirectsMenuItem= [{label: 'Update', icon: 'pi pi-refresh', command: () => {
            this.redirectValue(x.id,3);
          }},
          {label: 'Delete', icon: 'pi pi-times', command: () => {
            this.redirectValue(x.id,4);
          }
        }];
      });
      })
    }
    if(index==3){
      this.cloathesBrandService.getClothingBrand(this.idObject).subscribe(value => {
        this.clothesBrand=value;
      })
    }
  }

  redirectValue(id:string,index:number){
    this.idObject=id;
    this.displayOption(index);
  }

  headerOption(index:number){
    if(index==1){
      this.headerValue='Add new Clothing brand'
    }
    if(index==2){
      this.headerValue='List all existing clothing brands'
    }
    if(index==3){
      this.headerValue="Update Clothes Brand with id: "+this.idObject;
    }
    if(index==4){
      this.headerValue="Delete Clothes Brand with id: "+this.idObject;
    }
  }
  submitOption(index:number){
    if(index==1){
      this.cloathesBrandService.postClothingBrand(this.clothesBrand).subscribe(value => {
        this.clothesBrand=value;
      });
    }
    if(index==3){
      this.clothesBrand.redirectsMenuItem=undefined;
      this.cloathesBrandService.putClothingBrand(this.clothesBrand,this.idObject).subscribe(value => {
        this.clothesBrand=value;
      });
    }
    if(index==4){
      this.cloathesBrandService.deleteClothingBrand(this.idObject).subscribe(value => {this.cancelOptions()});
    }
  }


  cancelOptions(){
    this.displayDialog=false;
    this.displayDialogOption=0;
  }
}

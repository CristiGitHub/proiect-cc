import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {ConfirmationDatSet} from "../../model/ConfirmationDataSet";
import {ClothesCatergory} from "../../model/ClothesCatergory";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-confirmation-dataset',
  templateUrl: './confirmation-dataset.component.html',
  styleUrls: ['./confirmation-dataset.component.css']
})
export class ConfirmationDatasetComponent implements OnInit{

  adminService!:AdminService;
  confirmationDataSetList:ConfirmationDatSet[]= [];

  confirmationDataSet!:ConfirmationDatSet;
  visable:boolean=false;
  clothesCategoryList:ClothesCatergory[]=[];
  dataService!:DataService;

  constructor(adminService:AdminService,dataService:DataService) {
    this.adminService=adminService;
    this.dataService=dataService;
  }
  ngOnInit(): void {
    this.clothesCategoryList=this.dataService.loadDataClothesCategory();
    this.adminService.getAllUnconfirmationDatSet().subscribe(data=>{
      this.confirmationDataSetList=data;
    })
  }

  showDialog(confirmation:ConfirmationDatSet ){
    this.confirmationDataSet = confirmation;
    this.visable =true
  }

  updateConfirmationDataSet(){
    this.adminService.putConfirmationDatSet(this.confirmationDataSet,this.confirmationDataSet.id).subscribe(data=>{
      this.adminService.getAllUnconfirmationDatSet().subscribe(value=>{
        this.confirmationDataSetList=value;
        this.visable=false;
      })
    })
  }
  deleteConfirmationDataSet(){
    this.adminService.deleteConfirmationDatSet(this.confirmationDataSet.id).subscribe(data=>{
      console.log("deleted");
      this.visable=false;
    })
  }

}

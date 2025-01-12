import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {DataService} from "../../service/data.service";
import {SidebarModule} from 'primeng/sidebar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {


  @Output() logoutEvent = new EventEmitter<any>();
  @Output() onOpenCloseNavbar = new EventEmitter<any>();
  @Input() username!:string | undefined;
  @Input() isAdmin:boolean=false;
  items!: MenuItem[];
  display:boolean=false;
  private dataService: any;
  responseList!:any[];


  constructor(dataService:DataService) {
  }

  ngOnInit() {
  }

  logoutEventEmit(){
    this.logoutEvent.emit("hello");
  }
  closeNavbar(){
    this.onOpenCloseNavbar.emit(false);
  }
  openNavbar(){
    this.onOpenCloseNavbar.emit(true);
  }



}

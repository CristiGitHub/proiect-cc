import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {ButtonModule} from 'primeng/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hephasteus-frontend';
  public isLoggedIn:boolean = false;
  public sizeMain:boolean=false;
  public userProfile: KeycloakProfile | null = null;
  public isAdmin:boolean=false;

  constructor(private readonly keycloak: KeycloakService) {
  }
  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    type roleUser = Array<{id:number, text: string}>;
     this.isAdmin=await this.keycloak.isUserInRole("administrator");
    if( this.isLoggedIn){
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public goLogin(){
    this.keycloak.login();
  }
  public goLogout(){
    this.keycloak.logout();
  }

  public goRegister(){
    this.keycloak.register();
  }

  receiveLogoutEvent($event:any){
    this.goLogout();
  }

  receiveCloneOpenNavbar($event:any){
    this.sizeMain=$event
  }

}

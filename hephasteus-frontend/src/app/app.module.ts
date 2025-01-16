import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MenuModule } from 'primeng/menu';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {DataService} from "./service/data.service";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ClothingMainComponent } from './components/clothing-main/clothing-main.component';
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import { ClothingDisplayComponent } from './components/clothing-display/clothing-display.component';
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {TableModule} from "primeng/table";
import { AboutComponent } from './components/about/about.component';
import {AuthInterceptor} from "./guard/auth.interceptor";
import {DataViewModule} from "primeng/dataview";
import {TagModule} from "primeng/tag";
import { OutfitsCreatorComponent } from './components/outfits-creator/outfits-creator.component';
import {PickListModule} from "primeng/picklist";
import {ToastModule} from "primeng/toast";
import {ResponseMessageService} from "./service/responseMessage.service";
import {MessageService} from "primeng/api";
import { OutfitsComponent } from './components/outfits/outfits.component';
import {DropdownModule} from "primeng/dropdown";
import { ConfirmationDatasetComponent } from './components/confirmation-dataset/confirmation-dataset.component';
import {ImageModule} from "primeng/image";


function initializeKeycloak(keycloak: KeycloakService){
  return () =>
    keycloak.init({
      config:{
        url: 'http://keycloak:8080/auth/',
        realm: 'demo',
        clientId: 'app-front'
      },
      initOptions:{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html'
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        return true;
      }
    });
}
@NgModule({
  declarations: [
    AppComponent,
    ClothingMainComponent,
    ClothingDisplayComponent,
    AdminDashboardComponent,
    AboutComponent,
    OutfitsCreatorComponent,
    OutfitsComponent,
    ConfirmationDatasetComponent
  ],
    imports: [
        BrowserModule,
        ButtonModule,
        HttpClientModule,
        AppRoutingModule,
        KeycloakAngularModule,
        CardModule,
        ToolbarModule,
        SplitButtonModule,
        ColorPickerModule,
        FormsModule,
        DialogModule,
        InputTextModule,
        TableModule,
        DataViewModule,
        TagModule,
        PickListModule,
        ToastModule,
        DropdownModule,
        ReactiveFormsModule,
        ImageModule
    ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }, { provide: HTTP_INTERCEPTORS, useClass: ResponseMessageService, multi: true },
      {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
},
      MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

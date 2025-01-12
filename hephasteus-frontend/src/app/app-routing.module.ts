import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from "primeng/menu";
import {TabMenuModule} from "primeng/tabmenu";
import {MenubarModule} from "primeng/menubar";
import {ClothingModalComponent} from "./components/clothing-modal/clothingModal.component";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule} from "@angular/forms";
import {ClothingMainComponent} from "./components/clothing-main/clothing-main.component";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./guard/AuthGuard";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {AboutComponent} from "./components/about/about.component";
import {FileUploadModule} from "primeng/fileupload";
import {ImageModule} from "primeng/image";
import {InputSwitchModule} from "primeng/inputswitch";
import {OutfitsCreatorComponent} from "./components/outfits-creator/outfits-creator.component";
import {ToastModule} from "primeng/toast";
import {OutfitsComponent} from "./components/outfits/outfits.component";
import {ConfirmationDatasetComponent} from "./components/confirmation-dataset/confirmation-dataset.component";


const routes: Routes = [
  { path: 'home', component: NavbarComponent },
  { path: 'clothes', component: ClothingMainComponent },
  { path: 'about', component:  AboutComponent},
  { path: 'clothing/:id' , component: ClothingModalComponent},
  { path: 'clothing' , component: ClothingModalComponent},
  { path: 'outfits' , component:OutfitsComponent},
  { path: 'outfits-creator/:id' , component: OutfitsCreatorComponent},
  { path: 'outfits-creator' , component: OutfitsCreatorComponent},
  { path: 'admin' , component: AdminDashboardComponent, canActivate:[AuthGuard]},
    {path: 'admin-confirmation' , component: ConfirmationDatasetComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MenuModule,
        TabMenuModule,
        MenubarModule,
        BrowserAnimationsModule,
        SidebarModule,
        ButtonModule,
        CardModule,
        ColorPickerModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        ImageModule,
        InputSwitchModule,
        ToastModule
    ],
  declarations: [
    NavbarComponent,
    ClothingModalComponent
  ],
  exports: [RouterModule, NavbarComponent ,ClothingModalComponent]
})
export class AppRoutingModule { }



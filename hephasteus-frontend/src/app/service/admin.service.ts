import {Injectable} from "@angular/core";
import {Clothing} from "../model/Clothing";
import {ConfirmationDatSet} from "../model/ConfirmationDataSet";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AdminService{

    private basicUrl:string='http://localhost:8085';

    private putMappingUrl=this.basicUrl+"/api/v1/admin/confirmationDataSet/";
    private deleteMappingUrl = this.basicUrl+"/api/v1/admin/confirmationDataSet/";
    private getAllUnconfirmedMappingUrl = this.basicUrl+"/api/v1/admin/confirmationDataSet/allUnconfirmed";

    constructor(private http: HttpClient) { }

    putConfirmationDatSet(body:ConfirmationDatSet,id:string){
        return this.http.put<ConfirmationDatSet>(this.putMappingUrl+id,body);
    }

    getAllUnconfirmationDatSet(){
        return this.http.get<ConfirmationDatSet[]>(this.getAllUnconfirmedMappingUrl);
    }
    deleteConfirmationDatSet(id:string){
        return this.http.delete(this.deleteMappingUrl+id);
    }




}
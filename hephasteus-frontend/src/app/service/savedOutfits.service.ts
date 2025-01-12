import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Clothing} from "../model/Clothing";
import {SavedOutfits} from "../model/SavedOutfits";

@Injectable({
    providedIn: 'root'
})
export class SavedOutfitsService {

    private basicUrl:string='http://localhost:8085';
    private postMappingUrl:string=this.basicUrl+"/api/v1/savedOutfits";
    private putMappingUrl:string=this.basicUrl+"/api/v1/savedOutfits/";
    private getByIdMappingUrl:string=this.basicUrl+"/api/v1/savedOutfits/getById/";
    private deleteMappingUrl:string=this.basicUrl+"/api/v1/savedOutfits/";

    private getAllMappingUrl:string=this.basicUrl+"/api/v1/savedOutfits/all";


    constructor(private http: HttpClient) { }


    postOutfit(body:SavedOutfits){
        return this.http.post<SavedOutfits>(this.postMappingUrl,body);
    }
    putOutfit(body:SavedOutfits,id:string){
        return this.http.put<SavedOutfits>(this.putMappingUrl+id,body);
    }
    getOutfit(id:string){
        return this.http.get<SavedOutfits>(this.getByIdMappingUrl+id);
    }

    getAllOutfits(){
        return this.http.get<SavedOutfits[]>(this.getAllMappingUrl);
    }
    deleteOutfit(id:string){
        return this.http.delete(this.deleteMappingUrl+id);
    }
}
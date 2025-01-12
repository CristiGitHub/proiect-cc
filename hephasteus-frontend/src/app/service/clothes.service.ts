import {HttpClient} from "@angular/common/http";
import {of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Clothing} from "../model/Clothing";

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private basicUrl:string='http://localhost:8085';
  private postMappingUrl:string=this.basicUrl+"/api/v1/clothing";
  private putMappingUrl:string=this.basicUrl+"/api/v1/clothing/";
  private getByIdMappingUrl:string=this.basicUrl+"/api/v1/clothing/getById/";
  private deleteMappingUrl:string=this.basicUrl+"/api/v1/clothing/";

  private getAllMappingUrl:string=this.basicUrl+"/api/v1/clothing/all";
  constructor(private http: HttpClient) { }

  postClothing(body:Clothing){
    return this.http.post<Clothing>(this.postMappingUrl,body);
  }
  putClothing(body:Clothing,id:string){
    return this.http.put<Clothing>(this.putMappingUrl+id,body);
  }
  getClothing(id:string){
    return this.http.get<Clothing>(this.getByIdMappingUrl+id);
  }

  getAllClothing(){
    return this.http.get<Clothing[]>(this.getAllMappingUrl);
  }
  deleteClothing(id:string){
    return this.http.delete(this.deleteMappingUrl+id);
  }


}

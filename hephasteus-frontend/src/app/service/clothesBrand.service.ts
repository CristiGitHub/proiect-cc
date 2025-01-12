import {HttpClient} from "@angular/common/http";
import {of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Clothing} from "../model/Clothing";
import {ClothesBrand} from "../model/ClothesBrand";

@Injectable({
  providedIn: 'root'
})
export class ClothesBrandService {
  private basicUrl:string='http://localhost:8085';
  private postMappingUrl:string=this.basicUrl+"/api/v1/clothingBrand";
  private putMappingUrl:string=this.basicUrl+"/api/v1/clothingBrand/";
  private getByIdMappingUrl:string=this.basicUrl+"/api/v1/clothingBrand/getById/";
  private deleteMappingUrl:string=this.basicUrl+"/api/v1/clothingBrand/";

  private getAllMappingUrl:string=this.basicUrl+"/api/v1/clothingBrand/all";
  constructor(private http: HttpClient) { }

  postClothingBrand(body:ClothesBrand){
    return this.http.post<ClothesBrand>(this.postMappingUrl,body);
  }
  putClothingBrand(body:ClothesBrand,id:string){
    return this.http.put<ClothesBrand>(this.putMappingUrl+id,body);
  }
  getClothingBrand(id:string){
    return this.http.get<ClothesBrand>(this.getByIdMappingUrl+id);
  }

  getAllClothingBrand(){
    return this.http.get<ClothesBrand[]>(this.getAllMappingUrl);
  }
  deleteClothingBrand(id:string){
    return this.http.delete(this.deleteMappingUrl+id);
  }


}

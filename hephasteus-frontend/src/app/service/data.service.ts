import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {ClothesBrand} from "../model/ClothesBrand";
import {ClothesCatergory} from "../model/ClothesCatergory";
import {EnumCollection} from "../model/EnumDto";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private enumCollection: EnumCollection | null = null;

  dataClothesCategory: any;
  dataClothesBrand:any;

  constructor(private http: HttpClient) { }

  loadDataClothesCategory() {

    if (this.dataClothesCategory) {
      return this.dataClothesCategory;
    } else {
      this.dataClothesCategory = ['pants', 't-shirt', 'skirt', 'dress', 'shorts', 'shoes', 'hat', 'longsleeve', 'outwear', 'shirt'];
      return this.dataClothesCategory
      }
    }

    loadSizeChart(){
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    }

  loadDataClothesBrand() {
    if (this.dataClothesBrand) {
      return of(this.dataClothesBrand);
    } else {
      return this.http.get<ClothesBrand[]>('http://localhost:8085/api/v1/clothingBrand/all').pipe(tap(data => {
        this.dataClothesBrand = data;
      }));
    }
  }

  getEnums(): Observable<EnumCollection> {
    if (this.enumCollection !== null) {
      return of(this.enumCollection);
    } else {
      return this.http.get<EnumCollection>('http://localhost:8085/api/v1/enums').pipe(
          tap((data: EnumCollection) => {
            this.enumCollection = data;
          })
      );
    }
  }

  getCampaigns(){
    return this.http.get('http://localhost:8085/api/v1/ClothesCategoryCategory/1');
  }
}

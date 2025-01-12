import {BasicDto} from "./BasicDto";
import {Clothing} from "./Clothing";

export class SavedOutfits{
  id!:string;
  name!:string;
  clothesIds!:string[];
  clothes:Clothing[]=[];
  occasion!:BasicDto;
  season!:BasicDto;
}

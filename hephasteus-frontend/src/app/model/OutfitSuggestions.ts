import {BasicDto} from "./BasicDto";

export class OutfitSuggestions {
  id!:string;
  name!:string;
  clothesIds!:string[];
  occasion!:BasicDto;
  season!:BasicDto;
  wheatherEnum!:BasicDto;
}

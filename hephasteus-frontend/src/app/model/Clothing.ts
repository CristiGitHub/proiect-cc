import {ClothesCatergory} from "./ClothesCatergory";
import {ClothesBrand} from "./ClothesBrand";

export class Clothing {
  id!:string;
  name!:string;
  description!:string;
  imageUrl!:string;
  image!:string;
  size!:string;

  availability!:boolean

  colors:string[]=[];
  clothesCategory!:ClothesCatergory;
  clothesBrand!:ClothesBrand;
}

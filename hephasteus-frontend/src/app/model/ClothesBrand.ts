import {MenuItem} from "primeng/api";

export class ClothesBrand {
  id!:string;
  name!:string;
  homepage!:string;

  redirectsMenuItem!:MenuItem[] | undefined;
}

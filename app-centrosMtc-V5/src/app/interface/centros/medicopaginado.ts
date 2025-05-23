import { Pageable } from "../pageable/pageable";
import { CentroMedico } from "./centromedico";


export interface Medicopaginado {
  content: CentroMedico[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

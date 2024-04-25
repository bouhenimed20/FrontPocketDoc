import { Reclamation } from "./Reclamation";

export interface Reponse {
  idRep: number;
  contenuRep: string;
  dateRep: Date;
  // Make reclamation property optional
  reclamation?: Reclamation;
}

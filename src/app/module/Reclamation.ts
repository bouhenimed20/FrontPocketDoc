import { Reponse } from "./Reponse";

export interface Reclamation {
  idRec: number;
  descriptionRec: string;
  dateRec: Date;
  status: string;
  // Include the responses property
  responses: Reponse[];
}

  
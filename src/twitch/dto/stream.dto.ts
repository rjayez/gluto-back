import { DateTime } from "luxon";

export interface StreamDto {
  debut: DateTime;
  fin: DateTime;
  jeu: string;
  titre: string;
  estAnnule: boolean;
  imageJeuUrl: string;
}

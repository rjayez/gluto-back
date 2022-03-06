import { ObjectId } from "mongoose";

export class UpdateCardDto {
  _id: ObjectId;
  id: number;
  name: string;
  description: string;
  rarity: string;
  serie: string;
  subtitle: string;
  category: string;
  subCategory: string;
}

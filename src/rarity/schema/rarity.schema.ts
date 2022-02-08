import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RarityDocument = Rarity & Document;

@Schema()
export class Rarity {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rate: number;
}

export const RaritySchema = SchemaFactory.createForClass(Rarity);

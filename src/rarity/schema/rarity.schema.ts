import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type RarityDocument = Rarity & Document;

@Schema()
export class Rarity {
  //@Prop({ type: ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rate: number;

  @Prop()
  order: number;
}

export const RaritySchema = SchemaFactory.createForClass(Rarity);

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  name: string;

  @Prop()
  order: number;

  @Prop()
  subtitle: string;

  @Prop()
  descriptio: string;

  @Prop()
  idPicture: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);

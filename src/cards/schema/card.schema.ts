import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Rarity, RaritySchema } from "../../rarity/schema/rarity.schema";
import * as mongoose from "mongoose";

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
  description: string;

  @Prop()
  pictureUrl: string;

  @Prop({ type: RaritySchema })
  rarity: Rarity;
}

export const CardSchema = SchemaFactory.createForClass(Card);

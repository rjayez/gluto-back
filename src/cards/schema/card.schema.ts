import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Rarity, RaritySchema } from "../../rarity/schema/rarity.schema";
import * as mongoose from "mongoose";
import { Serie } from "../../series/schema/serie.schema";

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Rarity" })
  rarity: Rarity;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Serie" })
  serie: Serie;
}

export const CardSchema = SchemaFactory.createForClass(Card);

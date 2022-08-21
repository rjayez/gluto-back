import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Card } from "../../cards/schema/card.schema";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type CollectionCardDocument = CollectionCard & Document;

@Schema()
export class CollectionCard {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Card" })
  card: Card;

  @Prop()
  timeDropped: number;
}

export const CollectionCardSchema = SchemaFactory.createForClass(CollectionCard);

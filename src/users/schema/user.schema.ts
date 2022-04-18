import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Card } from "../../cards/schema/card.schema";
import * as mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }] })
  cards: Card[];
}

export const UserSchema = SchemaFactory.createForClass(User);

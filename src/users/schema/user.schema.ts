import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CollectionCard } from "./collectionCard.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  displayName: string;

  @Prop()
  cards: CollectionCard[];
}

export const UserSchema = SchemaFactory.createForClass(User);

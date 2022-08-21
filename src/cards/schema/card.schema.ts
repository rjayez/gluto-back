import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Rarity } from "../../rarity/schema/rarity.schema";
import { Serie } from "../../series/schema/serie.schema";
import { Category } from "../../categories/schema/category.schema";
import { SubCategory } from "../../subcategories/schema/subcategory.schema";
import { ObjectId } from "mongodb";

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ type: ObjectId })
  _id: string;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" })
  subCategory: SubCategory;
}

export const CardSchema = SchemaFactory.createForClass(Card);

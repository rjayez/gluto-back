import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { SubCategory } from "../../subcategories/schema/subcategory.schema";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  order: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

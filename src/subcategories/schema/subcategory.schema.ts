import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Category } from "../../categories/schema/category.schema";
import * as mongoose from "mongoose";

export type SubCategoryDocument = SubCategory & Document;

@Schema()
export class SubCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  order: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category" })
  category: Category;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

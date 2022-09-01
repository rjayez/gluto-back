import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SerieDocument = Serie & Document;

@Schema()
export class Serie {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  dropEnabled: boolean;

  @Prop()
  visible: boolean;

  @Prop()
  order: number;
}

export const SerieSchema = SchemaFactory.createForClass(Serie);

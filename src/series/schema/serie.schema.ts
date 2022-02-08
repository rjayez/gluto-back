import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SerieDocument = Serie & Document;

@Schema()
export class Serie {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  dropEnabled: boolean;
}

export const SerieSchema = SchemaFactory.createForClass(Serie);

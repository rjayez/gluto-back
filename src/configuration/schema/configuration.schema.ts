import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ConfigurationsDocument = Configurations & Document;

@Schema()
export class Configurations {
  @Prop()
  name: string;

  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;

  @Prop()
  expiresIn: number;

  @Prop()
  obtainmentTimestamp: number;
}

export const ConfigurationsSchema = SchemaFactory.createForClass(Configurations);

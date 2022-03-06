import { PartialType } from "@nestjs/mapped-types";
import { CreateRarityDto } from "./create-rarity.dto";
import { ObjectId } from "mongoose";

export class UpdateRarityDto extends PartialType(CreateRarityDto) {
  _id: ObjectId;
}

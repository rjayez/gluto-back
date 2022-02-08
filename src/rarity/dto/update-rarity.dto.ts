import { PartialType } from "@nestjs/mapped-types";
import { CreateRarityDto } from "./create-rarity.dto";

export class UpdateRarityDto extends PartialType(CreateRarityDto) {
  id: number;
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { RarityService } from "./rarity.service";
import { CreateRarityDto } from "./dto/create-rarity.dto";
import { UpdateRarityDto } from "./dto/update-rarity.dto";

@Controller("rarities")
export class RarityController {
  constructor(private readonly rarityService: RarityService) {}

  @Post()
  create(@Body() createRarityDto: CreateRarityDto) {
    return this.rarityService.create(createRarityDto);
  }

  @Get()
  findAll() {
    return this.rarityService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rarityService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRarityDto: UpdateRarityDto) {
    return this.rarityService.update(+id, updateRarityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rarityService.remove(+id);
  }
}

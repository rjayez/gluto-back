import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { UploadDto } from "./dto/upload.dto";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { UpdateResult } from "mongodb";
import * as Path from "path";

@Controller("/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post("/upload")
  generateUploadUrl(@Body() uploadDto: UploadDto) {
    return this.cardsService.generateUploadUrl(uploadDto.type);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAllCards() {
    return this.cardsService.findAll();
  }

  @Put(":id")
  updateCard(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto): Promise<UpdateResult> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(":id")
  deleteCard(@Param("id") id: string) {
    return this.cardsService.remove(id);
  }
}

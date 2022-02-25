import { Body, Controller, Get, Post } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { UploadDto } from "./dto/upload.dto";
import { CreateCardDto } from "./dto/create-card.dto";

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
}

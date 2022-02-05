import { Body, Controller, Post } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { UploadDto } from "./dto/upload.dto";

@Controller("/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  generateUploadUrl(@Body() uploadDto: UploadDto) {
    return this.cardsService.generateUploadUrl(uploadDto.type);
  }
}

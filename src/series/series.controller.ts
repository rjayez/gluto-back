import { Body, Controller, Get, Post } from "@nestjs/common";
import { SeriesService } from "./series.service";
import { CreateSerieDto } from "./dto/create-serie.dto";

@Controller("series")
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  create(@Body() createSerieDto: CreateSerieDto) {
    return this.seriesService.create(createSerieDto);
  }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }
}

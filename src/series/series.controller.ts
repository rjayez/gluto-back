import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SeriesService } from "./series.service";
import { CreateSerieDto } from "./dto/create-serie.dto";
import { UpdateSerieDto } from "./dto/update-serie.dto";

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

  @Put(":id")
  update(@Param("id") id: string, @Body() updateSerieDto: UpdateSerieDto) {
    return this.seriesService.update(id, updateSerieDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seriesService.remove(id);
  }
}

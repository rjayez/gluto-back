import { Module } from "@nestjs/common";
import { SeriesService } from "./series.service";
import { SeriesController } from "./series.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Serie, SerieSchema } from "./schema/serie.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Serie.name, schema: SerieSchema }])],
  providers: [SeriesService],
  controllers: [SeriesController],
  exports: [SeriesService],
})
export class SeriesModule {}

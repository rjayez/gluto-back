import { Injectable } from "@nestjs/common";
import { CreateSerieDto } from "./dto/create-serie.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Serie, SerieDocument } from "./schema/serie.schema";

@Injectable()
export class SeriesService {
  constructor(@InjectModel(Serie.name) private seriesModel: Model<SerieDocument>) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    return this.seriesModel.create(createSerieDto);
  }

  findAll(): Promise<Serie[]> {
    return this.seriesModel.find().exec();
  }
}

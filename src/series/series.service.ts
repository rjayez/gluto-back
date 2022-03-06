import { Injectable } from "@nestjs/common";
import { CreateSerieDto } from "./dto/create-serie.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Serie, SerieDocument } from "./schema/serie.schema";
import { DeleteResult, UpdateResult } from "mongodb";
import { UpdateSerieDto } from "./dto/update-serie.dto";

@Injectable()
export class SeriesService {
  constructor(@InjectModel(Serie.name) private seriesModel: Model<SerieDocument>) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    return this.seriesModel.create(createSerieDto);
  }

  findAll(): Promise<Serie[]> {
    return this.seriesModel.find().exec();
  }

  update(id: string, updateSerieDto: UpdateSerieDto): Promise<UpdateResult> {
    return this.seriesModel.updateOne({ _id: id }, updateSerieDto).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.seriesModel.deleteOne({ _id: id }).exec();
  }
}

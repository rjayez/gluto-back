import { Injectable } from "@nestjs/common";
import { CreateRarityDto } from "./dto/create-rarity.dto";
import { UpdateRarityDto } from "./dto/update-rarity.dto";
import { Rarity, RarityDocument } from "./schema/rarity.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteResult, UpdateResult } from "mongodb";

@Injectable()
export class RarityService {
  constructor(@InjectModel(Rarity.name) private rarityModel: Model<RarityDocument>) {}

  async create(createRarityDto: CreateRarityDto): Promise<Rarity> {
    return this.rarityModel.create(createRarityDto);
  }

  findAll(): Promise<Rarity[]> {
    return this.rarityModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} rarity`;
  }

  update(id: string, updateRarityDto: UpdateRarityDto): Promise<UpdateResult> {
    return this.rarityModel.updateOne({ _id: id }, updateRarityDto).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.rarityModel.deleteOne({ _id: id }).exec();
  }
}

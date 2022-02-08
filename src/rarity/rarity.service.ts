import { Injectable } from "@nestjs/common";
import { CreateRarityDto } from "./dto/create-rarity.dto";
import { UpdateRarityDto } from "./dto/update-rarity.dto";
import { Rarity, RarityDocument } from "./schema/rarity.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

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

  update(id: number, updateRarityDto: UpdateRarityDto) {
    return `This action updates a #${id} rarity`;
  }

  remove(id: number) {
    return `This action removes a #${id} rarity`;
  }
}

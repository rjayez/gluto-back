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

  findOneByName(name: string): Promise<Rarity> {
    return this.rarityModel.findOne({ name: name }).exec();
  }

  update(id: string, updateRarityDto: UpdateRarityDto): Promise<UpdateResult> {
    return this.rarityModel.updateOne({ _id: id }, updateRarityDto).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.rarityModel.deleteOne({ _id: id }).exec();
  }

  async getRandomRarities(): Promise<Rarity> {
    const rarities: Rarity[] = (await this.findAll())
      //Pour avoir la taux le plus grand (commun) en premier
      .sort((a, b) => a.rate - b.rate)
      .reverse();

    let rateDrop = rarities.map(rarity => rarity.rate);
    let cumul = [rateDrop[0]];

    // Transformer pour obtenir 70 95 100
    let rateSum = rateDrop.reduce((p, c) => {
      cumul.push(p + c);
      return p + c;
    });

    let rng = Math.random() * rateSum;
    if (rng >= 0 && rng < cumul[0]) return rarities[0];

    if (rng >= cumul[0] && rng < cumul[1]) return rarities[1];

    if (rng >= cumul[1] && rng <= cumul[2]) return rarities[2];

    return rarities[0];
  }
}

import { Injectable } from "@nestjs/common";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidV4 } from "uuid";
import { UpdateRarityDto } from "../rarity/dto/update-rarity.dto";
import { Card, CardDocument } from "./schema/card.schema";
import { CreateCardDto } from "./dto/create-card.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Rarity, RarityDocument } from "../rarity/schema/rarity.schema";

@Injectable()
export class CardsService {
  s3Client: S3Client;

  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @InjectModel(Rarity.name) private rarityModel: Model<RarityDocument>
  ) {
    this.s3Client = new S3Client({ region: "eu-west-3" });
  }

  async generateUploadUrl(type: string): Promise<PresignedPost> {
    /**
     * We generate a new uuid as name, to prevent conflicting filenames.
     * You can install this package with `npm i uuid`
     */
    const id = uuidV4();
    const expiresInMinutes = 1;
    const BUCKET_NAME = "glutobucket";
    return await createPresignedPost(this.s3Client, {
      Bucket: BUCKET_NAME,
      Key: `public/${id}`,
      Expires: expiresInMinutes * 60, // the url will only be valid for 1 minute
      Conditions: [["eq", "$Content-Type", type]],
    });
  }

  async create(createCardDto: CreateCardDto) {
    const rarity = await this.rarityModel.findOne({ name: createCardDto.rarity }).exec();

    const cardModel = {
      ...createCardDto,
      rarity,
    };

    return this.cardModel.create(cardModel);
  }

  findAll() {
    return this.cardModel.find().exec();
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

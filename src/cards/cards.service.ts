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
import { Serie, SerieDocument } from "../series/schema/serie.schema";
import { Category, CategoryDocument } from "../categories/schema/category.schema";

@Injectable()
export class CardsService {
  s3Client: S3Client;

  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    @InjectModel(Rarity.name) private rarityModel: Model<RarityDocument>,
    @InjectModel(Serie.name) private serieModel: Model<SerieDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
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
    const { _id: rarityId } = rarity;
    const serie = await this.serieModel.findOne({ name: createCardDto.serie }).exec();
    const { _id: serieId } = serie;
    // const category = await this.categoryModel.findOne({ name: createCardDto.category }).exec();
    // const { _id: categoryId } = category;
    const cardModel = {
      ...createCardDto,
      rarity: rarityId,
      serie: serieId,
    };

    return this.cardModel.create(cardModel);
  }

  findAll() {
    return this.cardModel.find().populate("rarity").populate("serie").exec();
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

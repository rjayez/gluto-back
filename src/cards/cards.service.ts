import { Injectable } from "@nestjs/common";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidV4 } from "uuid";
import { CreateRarityDto } from "../rarity/dto/create-rarity.dto";
import { UpdateRarityDto } from "../rarity/dto/update-rarity.dto";
import { Card } from "./schema/card.schema";

@Injectable()
export class CardsService {
  s3Client: S3Client;
  constructor() {
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

  create(car: Card) {
    return "This action adds a new rarity";
  }

  findAll() {
    return `This action returns all rarity`;
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

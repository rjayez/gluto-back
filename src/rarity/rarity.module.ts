import { Module } from "@nestjs/common";
import { RarityService } from "./rarity.service";
import { RarityController } from "./rarity.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Rarity, RaritySchema } from "./schema/rarity.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Rarity.name, schema: RaritySchema }])],
  controllers: [RarityController],
  providers: [RarityService],
})
export class RarityModule {}

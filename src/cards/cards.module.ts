import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schema/card.schema";
import { RarityModule } from "../rarity/rarity.module";
import { Rarity, RaritySchema } from "../rarity/schema/rarity.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Rarity.name, schema: RaritySchema },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

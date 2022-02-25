import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schema/card.schema";
import { Rarity, RaritySchema } from "../rarity/schema/rarity.schema";
import { Serie, SerieSchema } from "../series/schema/serie.schema";
import { Category, CategorySchema } from "../categories/schema/category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Rarity.name, schema: RaritySchema },
      { name: Serie.name, schema: SerieSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}

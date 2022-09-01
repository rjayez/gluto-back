import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schema/card.schema";
import { Category, CategorySchema } from "../categories/schema/category.schema";
import { SubCategory, SubCategorySchema } from "../subcategories/schema/subcategory.schema";
import { RarityModule } from "../rarity/rarity.module";
import { SeriesModule } from "../series/series.module";

@Module({
  imports: [
    RarityModule,
    SeriesModule,
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

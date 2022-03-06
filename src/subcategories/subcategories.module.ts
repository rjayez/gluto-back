import { Module } from "@nestjs/common";
import { SubcategoriesService } from "./subcategories.service";
import { SubcategoriesController } from "./subcategories.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SubCategory, SubCategorySchema } from "./schema/subcategory.schema";
import { Category, CategorySchema } from "../categories/schema/category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}

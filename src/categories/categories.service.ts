import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schema/category.schema";
import { Model } from "mongoose";
import { SubCategory, SubCategoryDocument } from "../subcategories/schema/subcategory.schema";
import { DeleteResult, UpdateResult } from "mongodb";

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryModel.updateOne({ _id: id }, updateCategoryDto).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.categoryModel.deleteOne({ _id: id }).exec();
  }
}

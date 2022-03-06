import { Injectable } from "@nestjs/common";
import { CreateSubcategoryDto } from "./dto/create-subcategory.dto";
import { UpdateSubcategoryDto } from "./dto/update-subcategory.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubCategory, SubCategoryDocument } from "./schema/subcategory.schema";
import { DeleteResult, UpdateResult } from "mongodb";
import { Category, CategoryDocument } from "../categories/schema/category.schema";

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategoryDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const category = await this.categoryModel.findOne({ name: createSubcategoryDto.category }).exec();
    const { _id: categoryId } = category;

    const subCatModel = {
      ...createSubcategoryDto,
      category: categoryId,
    };

    return this.subCategoryModel.create(subCatModel);
  }

  findAll() {
    return this.subCategoryModel.find().populate("category").exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto): Promise<UpdateResult> {
    const category = await this.categoryModel.findOne({ name: updateSubcategoryDto.category }).exec();
    const { _id: categoryId } = category;

    const subCatModel = {
      ...updateSubcategoryDto,
      category: categoryId,
    };

    return this.subCategoryModel.updateOne({ _id: id }, subCatModel).exec();
  }

  remove(id: string): Promise<DeleteResult> {
    return this.subCategoryModel.deleteOne({ _id: id }).exec();
  }
}

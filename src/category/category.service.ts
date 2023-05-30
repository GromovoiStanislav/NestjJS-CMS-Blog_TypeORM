import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>
  ) {
  }


  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    Object.assign(category, createCategoryDto);
    this.repo.create(category);
    return await this.repo.save(category);
  }


  async findAll() {
    return await this.repo.find();
  }


  async findOne(id: number) {
    return await this.repo.findOneBy({ id });
  }


  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    Object.assign(category, updateCategoryDto);
    return this.repo.save(category);
  }


  async remove(id: number) {
    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    try {
      await this.repo.remove(category);
      return category;

    } catch (err) {
      throw new BadRequestException("Operation failed");
    }
  }

}

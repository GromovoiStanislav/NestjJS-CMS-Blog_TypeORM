import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('category')
export class CategoryController {

  constructor(
    private readonly categoryService: CategoryService
  ) {
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }


  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }


  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }


  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(
    @Param('id') id: number,
    @Res() res: Response) {
    const category = await this.categoryService.remove(id);
    return res.status(200).json({ success: true, category: category });
  }

}

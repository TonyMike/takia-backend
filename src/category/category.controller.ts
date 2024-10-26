import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }
  @Post('/subCategory')
  async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoryService.subCategory(createSubCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findCategory(@Param('id') id: number) {
    return await this.categoryService.findCategory(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoryService.remove(+id);
  }
  @Patch('/subCategory/:id')
  async updateSubCategory(
    @Param('id') id: number,
    @Body() updateSubCategory: UpdateSubCategoryDto,
  ) {
    return await this.categoryService.updateSubCategory(id, updateSubCategory);
  }
}

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
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @Post('/subCategory')
  createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.categoryService.subCategory(createSubCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findCategory(@Param('id') id: number) {
    return this.categoryService.findCategory(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
  @Patch('/subCategory/:id')
  updateSubCategory(
    @Param('id') id: number,
    @Body() updateSubCategory: UpdateSubCategoryDto,
  ) {
    return this.categoryService.updateSubCategory(id, updateSubCategory);
  }
}

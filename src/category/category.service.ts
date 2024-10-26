import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateSubCategoryDto } from './dto/update-subCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const checkIfCategoryExists = await this.prismaService.category.findUnique({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (checkIfCategoryExists)
      throw new ConflictException('Category already exists');
    const category = await this.prismaService.category.create({
      data: {
        name: createCategoryDto.name,
        image: createCategoryDto.image,
      },
    });
    return category;
  }

  async subCategory(createSubCategoryDto: CreateSubCategoryDto) {
    await this.findCategory(createSubCategoryDto.categoryId);
    const checkIfSubCategoryExistsInCategory =
      await this.prismaService.category.findUnique({
        where: {
          name: createSubCategoryDto.name,
        },
      });
    if (checkIfSubCategoryExistsInCategory)
      throw new ConflictException('Name is already used as a category.');

    const checkIfSubCategoryExists =
      await this.prismaService.subCategory.findUnique({
        where: {
          name: createSubCategoryDto.name,
        },
      });

    if (checkIfSubCategoryExists)
      throw new ConflictException('SubCategory already exists');

    const subCategories = await this.prismaService.subCategory.create({
      data: {
        name: createSubCategoryDto.name,
        categoryId: createSubCategoryDto.categoryId,
        image: createSubCategoryDto.image,
      },
    });

    return subCategories;
  }

  async findAll() {
    return await this.prismaService.category.findMany({
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
  }

  async findCategory(id: number) {
    if (!id) throw new BadRequestException('Category id is required');
    const cat = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }
  async findSubCategory(name: string) {
    const subCat = await this.prismaService.subCategory.findUnique({
      where: {
        name,
      },
    });
    if (!subCat) throw new NotFoundException('SubCategory not found');
    return subCat;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const subCategory = await this.prismaService.subCategory.findUnique({
      where: {
        id,
      },
    });
    if (!subCategory) throw new NotFoundException('SubCategory not found');
    return this.prismaService.subCategory.update({
      where: {
        id,
      },
      data: {
        ...updateSubCategoryDto,
      },
    });
  }
}

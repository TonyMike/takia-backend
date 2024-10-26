import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const userExists = await this.userService.findById(createProductDto.userId);
    // console.log('🚀 ~ ProductsService ~ create ~ userExists:', userExists);
    if (!userExists)
      throw new UnauthorizedException('Please login to post product');

    const category = await this.prismaService.category.findUnique({
      where: { id: createProductDto.categoryId },
    });
    const subCategory = await this.prismaService.subCategory.findUnique({
      where: { id: createProductDto.subCategoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (!subCategory) throw new NotFoundException(' SubCategory not found');

    const product = await this.prismaService.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        negotiable: createProductDto.negotiable,
        condition: createProductDto.condition,
        categoryId: createProductDto.categoryId, // Use categoryId
        subCategoryId: createProductDto.subCategoryId, // Use subCategoryId
        state: createProductDto.state,
        school: createProductDto.school,
        images: createProductDto.images,
        price: createProductDto.price,
        userId: createProductDto.userId,
      },
    });

    return product;
  }

  async findAll() {
    return await this.prismaService.product.findMany({
      include: {
        category: true,
        subCategory: true,
        User: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
            businessName: true,
            whatsappLink: true,
            instagramLink: true,
            twitterLink: true,
            profilePicture: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            fullName: true,
            email: true,
            phoneNumber: true,
            businessName: true,
            whatsappLink: true,
            instagramLink: true,
            twitterLink: true,
            profilePicture: true,
            createdAt: true,
          },
        }, // Include user details if needed
        savedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        title: updateProductDto.title,
        description: updateProductDto.description,
        negotiable: updateProductDto.negotiable,
        condition: updateProductDto.condition,
        category: { connect: { id: updateProductDto.categoryId } },
        subCategory: { connect: { id: updateProductDto.subCategoryId } },
        state: updateProductDto.state,
        school: updateProductDto.school,
        images: updateProductDto.images,
        price: updateProductDto.price,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }

  async saveProduct(productId: string, userId: string) {
    // Check if the product exists
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Create a new record in the relation table for saved products
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        savedProduct: {
          connect: { id: productId }, // This assumes savedProduct is a relation defined in the User model
        },
      },
    });

    return { message: 'Product saved successfully' };
  }
}

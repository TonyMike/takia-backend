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
    console.log('🚀 ~ ProductsService ~ create ~ userExists:', userExists);
    if (!userExists)
      throw new UnauthorizedException('Please login to post product');

    return await this.prismaService.product.create({
      data: {
        title: createProductDto.title,
        description: createProductDto.description,
        negotiable: createProductDto.negotiable,
        condition: createProductDto.condition,
        category: createProductDto.category,
        subCategory: createProductDto.subCategory,
        state: createProductDto.state,
        school: createProductDto.school,
        images: createProductDto.images,
        price: createProductDto.price,
        userId: createProductDto.userId,
      },
    });
  }

  async findAll() {
    return await this.prismaService.product.findMany({
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
        },
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        User: true, // Include user details if needed
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
        category: updateProductDto.category,
        subCategory: updateProductDto.subCategory,
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
}

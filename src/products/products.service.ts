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
    const generateSlug = (title: string, id: string) => {
      const slug = title + id;

      return slug
        .toLowerCase() // Convert to lowercase
        .trim() // Remove whitespace from both sides
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-|-$/g, '');
    };
    const userExists = await this.userService.findById(createProductDto.userId);

    if (!userExists)
      throw new UnauthorizedException('Please login to post product');

    const product = await this.prismaService.product.create({
      data: {
        title: createProductDto.title,
        slug: '',
        description: createProductDto.description,
        negotiable: createProductDto.negotiable,
        condition: createProductDto.condition,
        category: { connect: { id: createProductDto.categoryId } },
        subCategory: { connect: { id: createProductDto.subCategoryId } },
        state: createProductDto.state,
        school: createProductDto.school,
        images: createProductDto.images,
        price: createProductDto.price,
        User: { connect: { id: createProductDto.userId } },
      },
    });
    const slug = generateSlug(createProductDto.title, product.id);
    await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        slug: slug,
      },
    });
    return product;
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

  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: { slug },
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
  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return await this.prismaService.product.update({
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

  async updateViewCount(slug: string) {
    await this.findBySlug(slug);
    await this.prismaService.product.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    });
    return 'Product view count updated successfully';
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

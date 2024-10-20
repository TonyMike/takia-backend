import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // database activities
  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;

    const hashPassword = await hash(password);

    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        password: hashPassword,
        isGoogleAuth: false,
      },
    });
    return user;
  }

  async createGoogleUser(userDetails: any) {
    return this.prismaService.user.create({
      data: {
        ...userDetails,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }
  async updateHashedRefreshToken(
    id: string,
    hashedRefreshToken: string | null,
  ) {
    return this.prismaService.user.update({
      where: { id: id },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  // helpers function

  //find user by email
  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
  async findByPhoneNumber(phoneNumber: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        phoneNumber,
      },
    });
    return user;
  }

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
